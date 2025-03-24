import { Router } from "express";
import { CreateFuelTypeController } from "../useCases/createFuelTypes/CreateFuelTypesController";
import { DeleteFuelTypesController } from "../useCases/deleteFuelTypes/DeleteFuelTypesController";
import { UpdateFuelTypeController } from "../useCases/updateFuelTypes/UpdateFuelTypesController";
import { FuelTypesRepository } from "../infra/prisma/repositories/FuelTypesRepository";
import { ListFuelTypesController } from "../useCases/listFuelTypes/listFuelTypesController";

const createFuelTypeController = new CreateFuelTypeController();
const deleteFuelTypeController = new DeleteFuelTypesController();
const updateFuelTypeController = new UpdateFuelTypeController();
const listFuelTypesController = new ListFuelTypesController();

export const fuelTypesRoutes = Router()



fuelTypesRoutes.post("/create", createFuelTypeController.handle);
fuelTypesRoutes.delete("/delete/:id", deleteFuelTypeController.handle);
fuelTypesRoutes.put("/update/:id", updateFuelTypeController.handle);
fuelTypesRoutes.post("/list", listFuelTypesController.handle)

