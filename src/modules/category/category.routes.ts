import { Router } from "express";
import categoryControllers from "./category.controllers";

const categoryRoutes = Router();

categoryRoutes.get("/get", categoryControllers.getCategories);
categoryRoutes.get("/:id", categoryControllers.getCategoryById);
categoryRoutes.post("/post", categoryControllers.postCategory);
categoryRoutes.put("/put/:id", categoryControllers.putCategory); 
categoryRoutes.delete("/delete/:id", categoryControllers.deleteCategory); 

export default categoryRoutes;