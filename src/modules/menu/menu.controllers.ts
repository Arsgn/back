// import { Request, Response } from "express";
// import prisma from "../../plugins/prisma";

// const getMenu = async (req: Request, res: Response) => {
//   try {
//     const menu = await prisma.menu.findMany({
//       select: {
//         title: true,
//         description: true,
//         image: true,
//         price: true,
//         ingredients: true,
//         category: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//         extras: true,
//         drinks: true,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       data: menu,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: `Error in getAbout: ${error}`,
//     });
//   }
// };

// const postMenu = async (req: Request, res: Response) => {
//   try {
//     const {
//       title,
//       description,
//       image,
//       price,
//       ingredients,
//       categoryId,
//       extras = [],
//       drinks = [],
//     } = req.body;

//     if (!title?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Название обязательно",
//       });
//     }

//     const newMenu = await prisma.menu.create({
//       data: {
//         title,
//         description,
//         image,
//         price,
//         ingredients,

//         category: {
//           connectOrCreate: {
//             where: { name: "Pizza" },
//             create: { name: "Pizza" },
//           },
//         },

//         extras: {
//           create: extras.map((e: any) => ({
//             title: e.title,
//             price: e.price,
//           })),
//         },

//         drinks: {
//           create: drinks.map((d: any) => ({
//             title: d.title,
//             price: d.price,
//           })),
//         },
//       },
//     });

//     res.status(201).json({
//       success: true,
//       data: newMenu,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: `Error in postMenu: ${error}`,
//     });
//   }
// };

// const deleteMenu = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id);

//     if (isNaN(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Не передан aboutId!!!",
//       });
//     }

//     const exists = await prisma.menu.findUnique({
//       where: { id },
//     });
//     if (!exists) {
//       return res.status(404).json({
//         success: false,
//         message: "Тур с таким ID не найдена!!!",
//       });
//     }

//     const delMenu = await prisma.menu.delete({
//       where: { id },
//     });

//     res.status(200).json({
//       success: true,
//       delMenu,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: `Error in getAbout: ${error}`,
//     });
//   }
// };

// const putMenu = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id);

//     const {
//       title,
//       description,
//       image,
//       price,
//       category,
//       ingredients,
//       categoryId,
//       extras,
//       drinks,
//     } = req.body;

//     const exists = await prisma.menu.findUnique({
//       where: { id },
//     });

//     if (!exists) {
//       return res.status(404).json({
//         success: false,
//         message: "Тур с таким ID не найден!",
//       });
//     }

//     const updatedMenu = await prisma.menu.update({
//       where: { id },
//       data: {
//         title,
//         description,
//         image,
//         price,
//         category,
//         ingredients,
//         categoryId,
//         extras,
//         drinks,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       updatedMenu,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: `Error in updatedMenu: ${error}`,
//     });
//   }
// };

// export default {
//   getMenu,
//   postMenu,
//   deleteMenu,
//   putMenu,
// };


// controllers/menu/menu.controllers.ts
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

const postMenu = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      image,
      price,
      ingredients,
      categoryId,
    } = req.body;

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

    const {
      title,
      description,
      image,
      price,
      ingredients,
      categoryId,
    } = req.body;

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
  postMenu,
  deleteMenu,
  putMenu,
};
