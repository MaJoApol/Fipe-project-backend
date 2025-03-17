import { Router } from "express";

import { CreateFuelTypeController } from "../useCases/createFuelTypes/FuelTypesController";
const createFuelTypeController = new CreateFuelTypeController();

export const fuelTypesRoutes = Router()

fuelTypesRoutes.post("/create", createFuelTypeController.handle);
