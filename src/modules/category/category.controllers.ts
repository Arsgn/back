import { Request, Response } from "express";
import prisma from "../../plugins/prisma";

const getCategories = async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

const getCategoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Некорректный ID категории",
    });
  }

  const category = await prisma.category.findUnique({
    where: { id },
    include: { menus: true },
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Категория не найдена",
    });
  }

  res.json({
    success: true,
    data: category,
  });
};

const postCategory = async (req: Request, res: Response) => {
  try {
    const name = req.body?.name?.trim(); // коопсуз .trim()

    if (!name) {
      // эгер бош же undefined болсо
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
    console.error("postCategory error:", error); // лог үчүн console

    return res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      error: error.message, // ката
    });
  }
};

export default {
  getCategories,
  getCategoryById,
  postCategory,
};
