import { Request, Response } from "express";
import prisma from "../../plugins/prisma";

const getCategories = async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

const getCategoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const category = await prisma.category.findUnique({
    where: { id },
    include: { menus: true },
  });

  if (!category) {
    return res.status(404).json({ message: "Категория не найдена" });
  }

  res.json(category);
};

const postCategory = async (req: Request, res: Response) => {
  try {
    const name = req.body?.name?.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Имя категории обязательно",
      });
    }

    const category = await prisma.category.create({
      data: { name },
    });

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    console.error("postCategory error:", error);

    return res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      error: error.message,
    });
  }
};

const putCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: `Error in putCategory: ${error}`,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      data: deletedCategory,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: `Error in deleteCategory: ${error}`,
    });
  }
};

export default {
  getCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};
