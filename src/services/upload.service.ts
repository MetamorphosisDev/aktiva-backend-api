import cloudinary from "../config/cloudinary";

export const uploadImage = async (file: string) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "posts_images",
  });

  return result.secure_url;
};