import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `\n connected to mongodb,host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("failed to connect to mongodb!", {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

export { connectDB };
