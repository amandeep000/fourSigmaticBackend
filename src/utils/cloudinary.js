import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import * as fs from "node:fs";

dotenv.config();
// configuration of cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteLocalFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("failed to delete temporary files", err);
      }
    });
  }
};

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded on cloudinary. File src: ", response.url);
    // once file is uploaded we would like to delete file from our server
    deleteLocalFile(localFilePath);
    if (!response?.url) {
      console.error("Upload response is invalid:", response);
      return null;
    }
    console.log(response);
    return response;
  } catch (error) {
    console.error("cloudinary upload failed", error);
    deleteLocalFile(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from cloudinary,Public Id: ", publicId);
  } catch (error) {
    console.log("Error deleting from cloudinary");
    return null;
  }
};
export { uploadOnCloudinary, deleteFromCloudinary };
