import { Request, Response } from "express";
import { uploadImage } from "../../services/upload.service";

export const uploadImageController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gambar wajib diupload",
      });
    }

    const imageUrl = await uploadImage(req.file.path);

    res.status(200).json({
      success: true,
      message: "Gambar berhasil diupload",
      data: {
        url: imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengupload gambar",
    });
  }
};