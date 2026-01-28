import { Router } from "express";
import menuControllers from "./menu.controllers";

const menuRoutes = Router();

menuRoutes.get("/get", menuControllers.getMenu);
menuRoutes.post("/post", menuControllers.postMenu);
menuRoutes.delete("/delete/:id", menuControllers.deleteMenu);
menuRoutes.put("/put/:id", menuControllers.putMenu);

export default menuRoutes;
