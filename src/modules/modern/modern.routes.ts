import { Router } from "express";
import modernControllers from "./modern.controllers";

const modernRoutes = Router();

modernRoutes.get("/get", modernControllers.getModern);
modernRoutes.post("/post", modernControllers.postModern);
modernRoutes.delete("/delete/:id", modernControllers.deleteModern);
modernRoutes.put("/put/:id", modernControllers.putModern);

export default modernRoutes;
