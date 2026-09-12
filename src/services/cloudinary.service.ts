import cloudinary from "../config/cloudinary";

// Upload gambar ke Cloudinary
export const uploadToCloudinary = (
  fileBuffer: Buffer
): Promise<{
  secure_url: string;
  public_id: string;
}> => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "posts",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

    uploadStream.end(fileBuffer);
  });
};

// Hapus gambar dari Cloudinary
export const deleteFromCloudinary = async (
  publicId: string
) => {
  return cloudinary.uploader.destroy(publicId);
};