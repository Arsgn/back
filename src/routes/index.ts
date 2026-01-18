import { Router } from "express";
import cors from "cors";
import aboutPrismaRoutes from "../modules/about/about.routes";
import modernPrismaRoutes from "../modules/about/about.routes";
import categoryPrismaRoutes from "../modules/about/about.routes";

const configCors = {
	origin: [
		"http://localhost:3000",
	],
};

const router = Router();
router.use("/about", cors(configCors), aboutPrismaRoutes);
router.use("/modern", cors(configCors), modernPrismaRoutes);
router.use("/category", cors(configCors), categoryPrismaRoutes);

export default router;
