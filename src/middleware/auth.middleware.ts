import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Format token tidak valid",
      });
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah expired",
    });
  }
};