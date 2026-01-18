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
    const name = req.body.name?.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Имя категории обязательно"
      });
    }

    const category = await prisma.category.create({
      data: { name }
    });

    return res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("postCategory error:", error);

    return res.status(500).json({
      success: false,
      message: "Ошибка сервера"
    });
  }
};


export default {
  getCategories,
  getCategoryById,
  postCategory,
};
