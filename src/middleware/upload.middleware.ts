import multer from "multer";

const storage = multer.memoryStorage();

export const uploadSingleImage = multer({
  storage,
}).single("coverImage");