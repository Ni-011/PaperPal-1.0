"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";

const FileUpload = () => {
  // handling file config and upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg"] },
    maxFiles: 1,
    // upload the file
    onDrop: async (acceptedFiles) => {
      try {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        const response = await fetch("http://localhost:3000/api/uploadFile", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success message from backend:", data.message);
      } catch (error) {
        console.log("Error while sending the upload request to backend", error);
      }
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
