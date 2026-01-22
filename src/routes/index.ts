import { Router } from "express";
import cors from "cors";
import aboutRoutes from "../modules/about/about.routes";
import modernRoutes from "../modules/modern/modern.routes";
import menuRoutes from "../modules/menu/menu.routes";
import categoryRoutes from "../modules/category/category.routes";

const configCors = {
  origin: ["http://localhost:3000"],
};

const router = Router();
router.use("/category", cors(configCors), categoryRoutes);
router.use("/about", cors(configCors), aboutRoutes);
router.use("/modern", cors(configCors), modernRoutes);
router.use("/menu", cors(configCors), menuRoutes);

export default router;
