import { Router } from "express";
import { ensureAunthenticated } from "../../../shared/infra/http/middleware/ensureAuthenticated";
import { CreateVehicleController } from "../useCases/createVehicle/CreateVehicleController";
import { UpdateVehicleController } from "../useCases/updateVehicle/UpdateVehicleController";
import { DeleteVehicleController } from "../useCases/deleteVehicle/DeleteVehicleController";
import { ListVehicleController } from "../useCases/listVehicle/ListVehicleController";

const createVehicleController = new CreateVehicleController;
const deleteVehicleController = new DeleteVehicleController;
const updateVehicleController = new UpdateVehicleController;
const listVehicleController = new ListVehicleController;


export const vehiclesRoutes = Router();

vehiclesRoutes.post("/create", ensureAunthenticated, createVehicleController.handle)
vehiclesRoutes.delete("/delete/:id", ensureAunthenticated, deleteVehicleController.handle)
vehiclesRoutes.put("/update/:id", ensureAunthenticated, updateVehicleController.handle)
vehiclesRoutes.post("/list", ensureAunthenticated, listVehicleController.handle)