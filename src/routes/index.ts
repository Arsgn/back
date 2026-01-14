import { Router } from "express";
import cors from "cors";
import todoPrismaRoutes from "../modules/todo-prisma/todo-prisma.routes";

const configCors = {
	origin: [
		"http://localhost:3000",
	],
};

const router = Router();
router.use("/todo-prisma", cors(configCors), todoPrismaRoutes);

export default router;
