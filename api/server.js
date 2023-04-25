import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import conversationRoutes from "./routes/conversationRoutes.js"
import gigRoutes from "./routes/gigRoutes.js"
import cors from "cors"

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());// allows the app to take input from user
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes)


app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something is wrong"

  return res.status(errStatus).send(errMessage)
})

app.listen(8800, () => {
  connect();
  console.log("Backend server is ready");
});
