import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah expired",
    });
  }
};