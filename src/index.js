import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

console.log("CLOUDINARY ENV CHECK", {
  node_environment: process.env.NODE_ENV,
  mongodbURI: process.env.MONGODB_URI,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port: ", PORT);
    });
  })
  .catch((error) => {
    console.log("something went wrong while connecting to MongDb!");
  });
