import { Request, Response } from "express";

import { registerUser, loginUser, } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    await registerUser({ name, email, password, phoneNumber, });
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

    const token = generateToken(user.id);
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