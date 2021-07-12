import express from "express";
import MusicController from "../controller/MusicController";

export const musicRouter = express.Router();

musicRouter.post("/", MusicController.createMusic);
musicRouter.get("/all", MusicController.getAllMusic);
musicRouter.get("/search", MusicController.getMusicByTitle);
musicRouter.get("/search", MusicController.getMusicByAlbum);
musicRouter.get("/:id", MusicController.getMusicById);