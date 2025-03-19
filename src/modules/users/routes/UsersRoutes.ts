import { Router } from "express";
import { CreateUserController } from "../useCases/createUsers/CreateUserController";
import { AuthenticateUserController } from "../useCases/AuthenticateUser.ts/AuthenticateUserController";

const createUserController = new CreateUserController;
const authenticateUserController = new AuthenticateUserController;


export const userRoutes = Router();

userRoutes.post("/post", createUserController.handle)
userRoutes.post("/login", authenticateUserController.handle)