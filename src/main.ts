import "reflect-metadata";
import { createServer } from "http";
import { fuelTypesRoutes } from "./modules/fuelTypes/routes/FuelTypesRoutes";
import express from "express";
import "reflect-metadata";

const app = express();
app.use(express.json());

app.use(fuelTypesRoutes);

const server = createServer(app);

server.listen(3000, () => {
    console.log("Server started")
})