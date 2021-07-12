import express from "express";
import cors from "cors";
import {AddressInfo} from "net";
import { imageRouter } from "./router/ImageRouter";
import { musicRouter } from "./router/MusicRouter";
import { userRouter } from "./router/UserRouter";
import fileUpload from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/music", musicRouter);

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});