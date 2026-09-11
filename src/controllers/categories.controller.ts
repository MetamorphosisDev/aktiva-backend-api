import { Request, Response } from "express";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categories.service";

// GET ALL CATEGORIES
export const getCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil kategori",
    });
  }
};

// GET CATEGORY BY ID
export const getCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const category = await getCategoryById(id);

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: category[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil kategori",
    });
  }
};

// CREATE CATEGORY
export const createCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      slug,
      categoryName,
      categoryDescription,
    } = req.body;

    await createCategory(
      slug,
      categoryName,
      categoryDescription
    );

    res.status(201).json({
      success: true,
      message: "Kategori berhasil dibuat",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal membuat kategori",
    });
  }
};

// UPDATE CATEGORY
export const updateCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const {
      slug,
      categoryName,
      categoryDescription,
    } = req.body;

    await updateCategory(
      id,
      slug,
      categoryName,
      categoryDescription
    );

    res.status(200).json({
      success: true,
      message: "Kategori berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui kategori",
    });
  }
};

// DELETE CATEGORY
export const deleteCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await deleteCategory(id);

    res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menghapus kategori",
    });
  }
};