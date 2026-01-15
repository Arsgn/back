import { Request, Response } from "express";
import prisma from "../plugins/prisma";

const getModern = async (req: Request, res: Response) => {
  try {
    const about = await prisma.modernInterior.findMany({
      select: { image: true },
    });

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getModern: ${error}`,
    });
  }
};

const postModern = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;

    if (!image.trim()) {
      return res.status(401).json({
        success: false,
        message: "Названия обязательное!!!",
      });
    }

    const exists = await prisma.modernInterior.findFirst({
      where: { image },
    });

    const addModern = await prisma.modernInterior.create({
      data: {
        image,
      },
    });

    return res.status(200).json({
      success: true,
      data: addModern,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in postModern: ${error}`,
    });
  }
};

const deleteModern = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Не передан aboutId!!!",
      });
    }

    const exists = await prisma.modernInterior.findUnique({
      where: { id },
    });
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур с таким ID не найдена!!!",
      });
    }

    const delModern = await prisma.modernInterior.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Тур успешно удалён!!!",
      delModern,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Ошибка при удалении: ${error}`,
    });
  }
};

const putModern = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { image } = req.body;

    const exists = await prisma.modernInterior.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур с таким ID не найден!",
      });
    }

    const updatedModern = await prisma.modernInterior.update({
      where: { id },
      data: {
        image,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedModern,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Ошибка при обновлении данных: ${error}`,
    });
  }
};

export default {
  getModern,
  postModern,
  deleteModern,
  putModern,
};
