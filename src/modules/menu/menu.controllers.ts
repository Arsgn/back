import { Request, Response } from "express";
import prisma from "../../plugins/prisma";

const getMenu = async (req: Request, res: Response) => {
  try {
    const menu = await prisma.menu.findMany({
      include: {
        category: true,
        extras: true,
        drinks: true,
      },
    });

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getMenu: ${error}`,
    });
  }
};

const getMenuById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ success: false });
  }

  const menu = await prisma.menu.findUnique({
    where: { id },
    include: {
      category: true,
      extras: true,
      drinks: true,
    },
  });

  if (!menu) {
    return res.status(404).json({ success: false });
  }

  res.status(200).json({
    success: true,
    data: menu,
  });
};


const searchMenu = async (req: Request, res: Response) => {
  const { search } = req.query;
  console.log(search);

  try {
    let data;

    if (search) {
      data = await prisma.menu.findMany({
        where: {
          OR: [
            {
              title: {
                contains: String(search),
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: String(search),
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          category: true,
          extras: true,
          drinks: true,
        },
      });
    } else {
      data = await prisma.menu.findMany();
    }
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `error in searchTodo: ${e}`,
    });
  }
};

const postMenu = async (req: Request, res: Response) => {
  try {
    const { title, description, image, price, ingredients, categoryId } =
      req.body;

    const newMenu = await prisma.menu.create({
      data: {
        title,
        description,
        image,
        price,
        ingredients,
        categoryId,
      },
    });

    res.status(201).json({
      success: true,
      data: newMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in postMenu: ${error}`,
    });
  }
};

const deleteMenu = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const delMenu = await prisma.menu.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      data: delMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in deleteMenu: ${error}`,
    });
  }
};

const putMenu = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { title, description, image, price, ingredients, categoryId } =
      req.body;

    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: {
        title,
        description,
        image,
        price,
        ingredients,
        categoryId,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in putMenu: ${error}`,
    });
  }
};

export default {
  getMenu,
  searchMenu,
  postMenu,
  deleteMenu,
  putMenu,
  getMenuById
};
