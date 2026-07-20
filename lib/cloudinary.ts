import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const ALLOWED_DOC_FORMATS = ["pdf", "jpg", "jpeg", "png"];
export const MAX_DOC_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  format: string;
  bytes: number;
}

/**
 * Uploads a base64 data-URI (from the browser's FileReader) to Cloudinary
 * under a per-lead folder, e.g. surefund/leads/<leadId>/pan
 */
export async function uploadDocumentToCloudinary(
  dataUri: string,
  folder: string
): Promise<CloudinaryUploadResult> {
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: `surefund/${folder}`,
    resource_type: "auto",
    allowed_formats: ALLOWED_DOC_FORMATS,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function deleteDocumentFromCloudinary(publicId: string) {
  await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
}

export default cloudinary;
