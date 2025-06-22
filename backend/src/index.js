import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { app, server,io } from "./lib/socket.js";

dotenv.config();



const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'
}));
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

server.listen(PORT, async () => {
  console.log(`serrver is running at port ${PORT}`);
  await connectDB();
});
