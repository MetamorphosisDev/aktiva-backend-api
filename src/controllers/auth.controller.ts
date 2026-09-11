import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  registerUser,
  loginUser,
} from "../services/auth.service";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { nama, email, password, nomorTelepon } = req.body;
    await registerUser({ nama, email, password, nomorTelepon, });
    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Registrasi gagal",
    });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = jwt.sign(
      { userId: user.id, },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d", }
    );

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      success: false,
      message: "Email atau password salah",
    });
  }
};