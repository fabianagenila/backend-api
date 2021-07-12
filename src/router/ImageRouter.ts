import express from "express";
import imageController from "../controller/ImageController";

export const imageRouter = express.Router();

imageRouter.post("/", imageController.createImage);
imageRouter.get("/all", imageController.getAllImages);
imageRouter.get("/search", imageController.getImageBySubtitle);
imageRouter.get("/:id", imageController.getImageById);

