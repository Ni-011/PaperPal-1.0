"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Axis3DIcon, Inbox, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { headers } from "next/headers";

const FileUpload = () => {
  const [uplaoading, setUploading] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      fileKey,
      fileName,
    }: {
      fileKey: string;
      fileName: string;
    }) => {
      const formData = new FormData();
      formData.append("fileKey", fileKey);
      formData.append("fileName", fileName);
      console.log(fileKey, fileName);
      const response = await axios.post("/api/newConversation", formData);
      return response.data;
    },
  });
  // handling file config and upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg"] },
    maxFiles: 1,
    // upload the file
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 7 * 1024 * 1024) {
        toast.error("File size is too large");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const response = await fetch(`/api/uploadFile?filename=${file.name}`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        if (!data) {
          toast.error("Didn't recieve data from backend");
        }
        if (!data?.fileKey || !data?.fileName) {
          toast.error("Error uploading file");
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log("success", data);
          },
          onError: (error) => {
            toast.error("Error creating chat: " + error.message);
          },
        });
      } catch (error) {
        console.error("API request failed", error);
      } finally {
        setUploading(false);
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
        {uplaoading && isPending ? (
          <>
            <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
            <p className="text-sm mt-2">Initiating your chat</p>
          </>
        ) : (
          <div>
            <Inbox className="w-10 h-10 text-gray-500" />
            <p className="mt-2 text-sm text-gray-400">Upload PDF</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
