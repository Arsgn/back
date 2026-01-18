import { Router } from "express";
import aboutControllers from "./about.controllers";

const aboutRoutes = Router();

aboutRoutes.get("/get", aboutControllers.getAbout);
aboutRoutes.post("/post", aboutControllers.postAbout);
aboutRoutes.delete("/delete", aboutControllers.deleteAbout);
aboutRoutes.put("/put", aboutControllers.putAbout);

export default aboutRoutes;
