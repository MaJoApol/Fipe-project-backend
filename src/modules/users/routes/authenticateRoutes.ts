import { Router } from "express";
import { AuthenticateUserController } from "../useCases/authenticateUser.ts/AuthenticateUserController";

import { CreateUserController } from "../useCases/createUser.ts/CreateUserController";



const authenticateUserController = new AuthenticateUserController;
const createUserController = new CreateUserController;

export const authenticateRoutes = Router();

authenticateRoutes.post("/login", authenticateUserController.handle)
authenticateRoutes.post("/register", createUserController.handle)

