import { Router } from "express";
import { CreateUserController } from "../useCases/createUsers/CreateUserController";

const createUserController = new CreateUserController;

export const userRoutes = Router();

userRoutes.post("/post", createUserController.handle)
