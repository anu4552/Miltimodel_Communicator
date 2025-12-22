// config.js
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auth_demo";

export const JWT_SECRET = process.env.JWT_SECRET || "supersecret_access";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
export const REFRESH_SECRET = process.env.REFRESH_SECRET || "supersecret_refresh";
export const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || "7d";

export const RESET_TOKEN_EXPIRES_MIN = 60;

// Nodemailer
export const SMTP_HOST = process.env.SMTP_HOST || "smtp.example.com";
export const SMTP_PORT = process.env.SMTP_PORT || 587;
export const SMTP_USER = process.env.SMTP_USER || "user@example.com";
export const SMTP_PASS = process.env.SMTP_PASS || "password";

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";





// // config.js
// export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auth_demo";
// export const JWT_SECRET = process.env.JWT_SECRET || "supersecret_access";
// export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
// export const REFRESH_SECRET = process.env.REFRESH_SECRET || "supersecret_refresh";
// export const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || "7d";
// export const RESET_TOKEN_EXPIRES_MIN = 60; // minutes
// // Nodemailer (for sending reset emails)
// export const SMTP_HOST = process.env.SMTP_HOST || "smtp.example.com";
// export const SMTP_PORT = process.env.SMTP_PORT || 587;
// export const SMTP_USER = process.env.SMTP_USER || "user@example.com";
// export const SMTP_PASS = process.env.SMTP_PASS || "password";
// export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
