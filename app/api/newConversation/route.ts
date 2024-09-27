// creating a new conversation

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const dataForm = await req.formData();
    const fileKey = dataForm.get("fileKey");
    const fileName = dataForm.get("fileName");
    console.log(fileKey, fileName);
    return NextResponse.json({ fileKey, fileName });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
