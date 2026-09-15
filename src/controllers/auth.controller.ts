import { Request, Response } from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../services/auth.service";

import { generateToken } from "../utils/jwt";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    await registerUser({
      name,
      email,
      password,
      phoneNumber,
    });

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

// GET PROFILE
export const profile = async (req: Request, res: Response) => {
  try {
    const user = await getProfile(req.user!.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil profile",
    });
  }
};

// UPDATE PROFILE
export const updateProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, phoneNumber } = req.body;

    await updateProfile(req.user!.id, {
      name,
      email,
      phoneNumber,
    });

    res.status(200).json({
      success: true,
      message: "Profile berhasil diperbarui",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Gagal memperbarui profile",
    });
  }
};

// DELETE PROFILE
export const deleteProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteProfile(req.user!.id);

    res.status(200).json({
      success: true,
      message: "Akun berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Gagal menghapus akun",
    });
  }
};