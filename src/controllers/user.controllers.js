import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(400, "req body cannot be empty");
  }
  const { fullname, email, username, password } = req.body;
  // validation
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All the fields are required ");
  }

  // check if user exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // avatar and coverImage localPath provided by multer middleware
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  // upload the avatar and coverImage on to cloudinary using localpath
  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("uploaded avatar");
  } catch (error) {
    console.log("Error uploading avatar", error);
    throw new ApiError(500, "Avatar file is missing");
  }

  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverLocalPath);
    console.log("uploaded coverImage");
  } catch (error) {
    console.log("Error uploading coverImage", error);
    throw new ApiError(500, "coverImage is missing");
  }

  // creating user and in catch if the user creation fails we delete the uploaded files on cloudinary in catch block
  try {
    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage.url,
      email,
      password,
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
      "-password,-refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering a user");
    }
    res
      .status(201)
      .json(new ApiResponse(201, createdUser, "user registered successfully"));
  } catch (error) {
    console.log("User creation failed", error);
    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }
    throw new ApiError(
      500,
      "Something went wrong while registering a user and images were deleted"
    );
  }
});

export { registerUser };
