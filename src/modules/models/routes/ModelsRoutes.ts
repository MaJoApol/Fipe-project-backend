import { Router } from "express";
import { CreateModelController } from "../useCases/createModel/CreateModelController";
import { ensureAunthenticated } from "../../../shared/infra/http/middleware/ensureAuthenticated";
import { DeleteModelController } from "../useCases/deleteModel/DeleteModelController";
import { UpdateModelController } from "../useCases/updateModel/UpdateModelController";
import { ListModelController } from "../useCases/listModel/ListModelController";

const createModelController = new CreateModelController
const updateModelController = new UpdateModelController
const deleteModelController = new DeleteModelController
const listModelController = new ListModelController

export const modelsRoutes = Router();

modelsRoutes.post("/create", ensureAunthenticated, createModelController.handle)
modelsRoutes.put("/update/:id", ensureAunthenticated, updateModelController.handle)
modelsRoutes.delete("/delete/:id", ensureAunthenticated, deleteModelController.handle)
modelsRoutes.post("/list", ensureAunthenticated, listModelController.handle)