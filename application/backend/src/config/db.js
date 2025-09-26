import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = `mongodb://root:rootpass@mongodb:27017/appdb?authSource=admin`;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.debug("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
