import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

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

// to test if the variable are imported from env by dotenv
// console.log("CLOUDINARY ENV CHECK", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
