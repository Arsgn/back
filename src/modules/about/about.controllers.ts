import { Request, Response } from "express";
import prisma from "../../plugins/prisma";

const getAbout = async (req: Request, res: Response) => {
  try {
    const about = await prisma.about.findMany({
      select: { title: true, description: true, image: true },
    });

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getAbout: ${error}`,
    });
  }
};

const postAbout = async (req: Request, res: Response) => {
  try {
    const { title, description, image } = req.body;

    if (!title.trim()) {
      return res.status(401).json({
        success: false,
        message: "Названия обязательное!!!",
      });
    }

    const exists = await prisma.about.findFirst({
      where: { title },
    });

    const addAbout = await prisma.about.create({
      data: {
        title,
        description,
        image,
      },
    });

    return res.status(200).json({
      success: true,
      data: addAbout,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in postAbout: ${error}`,
    });
  }
};

const deleteAbout = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Не передан aboutId!!!",
      });
    }

    const exists = await prisma.about.findUnique({
      where: { id },
    });
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур с таким ID не найдена!!!",
      });
    }

    const delAbout = await prisma.about.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Тур успешно удалён!!!",
      delAbout,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Ошибка при удалении: ${error}`,
    });
  }
};

const putAbout = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { title, description, image } = req.body;

    const exists = await prisma.about.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур с таким ID не найден!",
      });
    }

    const updatedAbout = await prisma.about.update({
      where: { id },
      data: {
        title,
        description,
        image,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Ошибка при обновлении данных: ${error}`,
    });
  }
};

export default {
  getAbout,
  postAbout,
  deleteAbout,
  putAbout,
};
