// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";
import nodemailer from "nodemailer";
// import cookieParser from "cookie-parser";

import User from "../models/User.js";
import {
  JWT_SECRET, JWT_EXPIRES_IN, REFRESH_SECRET, REFRESH_EXPIRES_IN,
  RESET_TOKEN_EXPIRES_MIN,
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CLIENT_URL
} from "../config.js";

const router = express.Router();

// nodemailer transport (use env vars)
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

// helper to create tokens
const createAccessToken = (user) => jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
const createRefreshToken = (user) => jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

// -------- REGISTER --------
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email" });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 chars" });
    // you can add more strength checks here

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role: role === "admin" ? "admin" : "user" });
    await user.save();
    res.json({ message: "Registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- LOGIN --------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // store refresh token (so we can revoke later)
    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    await user.save();

    // set httpOnly cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    res.json({ accessToken, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- REFRESH TOKEN --------
router.post("/refresh", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const payload = jwt.verify(token, REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "No user" });

    // verify token exists in DB
    const exists = user.refreshTokens.find(rt => rt.token === token);
    if (!exists) return res.status(401).json({ message: "Refresh token revoked" });

    const accessToken = createAccessToken(user);
    // optionally rotate refresh tokens: keep same cookie or issue new one
    res.json({ accessToken, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

// -------- LOGOUT (single device) --------
router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      try {
        const payload = jwt.verify(token, REFRESH_SECRET);
        const user = await User.findById(payload.id);
        if (user) {
          user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== token);
          await user.save();
        }
      } catch (e) {}
    }
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// -------- LOGOUT ALL DEVICES --------
router.post("/logout-all", async (req, res) => {
  try {
    // expects user to be authenticated via access token in Authorization header
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token" });
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    user.refreshTokens = []; // delete all refresh tokens
    await user.save();
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out from all devices" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

// -------- FORGOT PASSWORD --------
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "If the email exists, reset link sent" }); // avoid account enumeration

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + RESET_TOKEN_EXPIRES_MIN * 60 * 1000; // minutes
    await user.save();

    const resetUrl = `${CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;
    const mail = {
      from: SMTP_USER,
      to: user.email,
      subject: "Password reset",
      text: `You asked to reset your password. Click here: ${resetUrl} (expires in ${RESET_TOKEN_EXPIRES_MIN} minutes)`,
      html: `<p>Click to reset password: <a href="${resetUrl}">Reset password</a></p><p>This link expires in ${RESET_TOKEN_EXPIRES_MIN} minutes.</p>`
    };
    await transporter.sendMail(mail);

    res.json({ message: "If the email exists, reset link sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- RESET PASSWORD --------
router.post("/reset-password", async (req, res) => {
  try {
    const { id, token, password } = req.body;
    if (!id || !token || !password) return res.status(400).json({ message: "Missing data" });
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "Invalid link" });
    if (user.resetPasswordToken !== token || Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- GET CURRENT USER --------
router.get("/me", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token" });
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select("-password -refreshTokens");
    if (!user) return res.status(401).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// -------- UPDATE PROFILE --------
router.post("/update-profile", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token" });
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const { email, password } = req.body;
    if (email && validator.isEmail(email)) user.email = email;
    if (password && password.length >= 6) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: "Profile updated", user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;

