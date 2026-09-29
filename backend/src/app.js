import express from "express";
import { createServer } from "node:http";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManger.js";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDB = await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to db");

  server.listen(app.get("port"), () => {
    console.log("listen to the port 8000");
  });
};

start();
