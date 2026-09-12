import multer from "multer";

// Simpan file sementara di memory
const storage = multer.memoryStorage();

export const uploadThumbnail = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format file harus JPG, PNG, atau WEBP"));
    }
  },
}).single("coverImage");