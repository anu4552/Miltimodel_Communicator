// // server.js

// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js"; // NEW

import { MONGO_URI } from "./config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// ROUTES
app.use("/auth", authRoutes);
app.use("/posts", postRoutes); // NEW

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running on " + PORT));
  })
  .catch(err => console.error("DB error:", err));





// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.js";
// import { MONGO_URI } from "./config.js";

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   credentials: true
// }));

// app.use("/auth", authRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose.connect(MONGO_URI).then(() => {
//   console.log("MongoDB connected");
//   app.listen(PORT, () => console.log("Server running on " + PORT));
// }).catch(err => {
//   console.error("DB error", err);
// });
