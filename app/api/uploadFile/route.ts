import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename: string = searchParams.get("filename") || ""; // get name from the URL
  const fileKey: string = Date.now().toString() + filename.replace(" ", "-"); // generate a unique key for the file

  if (filename && request.body) {
    // upload the file with fileKey
    const blob = await put(fileKey, request.body, {
      access: "public",
    });

    return NextResponse.json(
      { fileKey, filename }, // return the fileKey and filename
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } else {
    return NextResponse.json({ error: "No filename found" }, { status: 400 });
  }
}
