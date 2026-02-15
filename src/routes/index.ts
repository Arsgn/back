import { Router } from "express";
import aboutRoutes from "../modules/about/about.routes";
import modernRoutes from "../modules/modern/modern.routes";
import menuRoutes from "../modules/menu/menu.routes";
import categoryRoutes from "../modules/category/category.routes";

const router = Router();

router.use("/category", categoryRoutes);
router.use("/about", aboutRoutes);
router.use("/modern", modernRoutes);
router.use("/menu", menuRoutes);

export default router;

