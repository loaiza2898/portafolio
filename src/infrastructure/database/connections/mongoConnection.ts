import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error en MongoDB:", error);
    process.exit(1);
  }
};