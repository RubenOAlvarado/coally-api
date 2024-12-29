import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI || "";
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};