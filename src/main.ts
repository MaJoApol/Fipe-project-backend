import "reflect-metadata";
import { createServer } from "http";
import { routes } from "./shared/infra/http/routes";
import express from "express";
import "reflect-metadata";
import "./shared/containers/index";
import cors from "cors";


const app = express();
app.use(express.json());

app.use(
    cors({
      origin: "*"
    })
  );
  

app.use(routes);

const server = createServer(app);

server.listen(3001, () => {
    console.log("Server started")
})