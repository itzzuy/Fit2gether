const express = require("express")

import { connectDB, disconnectDB } from "./config/db.js"
import { config } from "dotenv"

config();
connectDB();
const app = express()

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Server is running"})
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});

// Handle unhandled promise rejections (e.g,. database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err)
  server.close(async () => {
    await disconnectDB();
    process.exit(1)
  });
});

// Handle uncaught exceptiond
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err)
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM recieved, shutting down gracefully")
  server.close(async () => {
    await disconnectDB();
    process.exit(0)
  });
});