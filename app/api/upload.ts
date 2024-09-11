"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = async (file: any) => {
  try {
    cloudinary.uploader.upload(file.path, (error: any, result: any) => {
      console.log(result, error);
    });
  } catch (error) {
    console.log("Error uploading file", error);
    throw error;
  }
};
