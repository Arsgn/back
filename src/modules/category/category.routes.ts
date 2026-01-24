import { Router } from "express";
import categoryControllers from "./category.controllers";

const categoryRoutes = Router();

categoryRoutes.get("/get-category", categoryControllers.getCategories);
categoryRoutes.get("/category/:id", categoryControllers.getCategoryById);
categoryRoutes.post("/post-category", categoryControllers.postCategory);

export default categoryRoutes;