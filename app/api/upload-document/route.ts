import { NextRequest, NextResponse } from "next/server";
import cloudinary, { ALLOWED_DOC_FORMATS, MAX_DOC_SIZE_BYTES } from "@/lib/cloudinary";

export const runtime = "nodejs";

// POST /api/upload-document — uploads ONE file at a time as multipart/form-data
// No login required — public applicants can upload documents too
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!folder) {
      return NextResponse.json({ error: "Folder is required" }, { status: 400 });
    }
    if (file.size > MAX_DOC_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File must be under 5MB" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_DOC_FORMATS.includes(ext)) {
      return NextResponse.json(
        { error: "Only PDF, JPG, JPEG, PNG allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `surefund/${folder}`,
          resource_type: "auto",
          allowed_formats: ALLOWED_DOC_FORMATS,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (err) {
    console.error("upload document error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}