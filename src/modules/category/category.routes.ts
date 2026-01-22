import { Router } from "express";
import categoryControllers from "./category.controllers";

const categoryRoutes = Router();

categoryRoutes.get("/", categoryControllers.getCategories);
categoryRoutes.get("/:id", categoryControllers.getCategoryById);
categoryRoutes.post("/post", categoryControllers.postCategory);

export default categoryRoutes;
