"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
import { upload } from "@/app/api/upload";
import { v2 as cloudinary } from "cloudinary";

const FileUpload = () => {
  // handling file config and upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg"] },
    maxFiles: 1,
    // upload the file
    onDrop: async (acceptedFiles) => {
      const uploadURL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]); // adding the file to the form data
      formData.append("upload_preset", "myPreset");
      formData.append(
        "cloud_name",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
      );
      // uplaoding
      const response = await fetch(uploadURL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("upload succesful", data);
      console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    },
  });

  return (
    <div className="p-2 bg-white rounded -xl">
      <div
        {...getRootProps()}
        className="cursor-pointer border-2 rounded-xl border-dashed bg-gray-50 py-8 flex justify-center items-center flex-col"
      >
        <input {...getInputProps()} />
        <div>
          <Inbox className="w-10 h-10 text-gray-500" />
          <p className="mt-2 text-sm text-gray-400">Upload PDF</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
