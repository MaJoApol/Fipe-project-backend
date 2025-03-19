import { Router } from "express";
import { CreateUserController } from "../useCases/createUsers/CreateUserController";
import { AuthenticateUserController } from "../useCases/AuthenticateUser.ts/AuthenticateUserController";
import { ensureAunthenticated } from "../../../shared/infra/http/middleware/ensureAuthenticated";

const createUserController = new CreateUserController;
const authenticateUserController = new AuthenticateUserController;


export const userRoutes = Router();

userRoutes.post("/post", ensureAunthenticated, createUserController.handle)
userRoutes.post("/login", authenticateUserController.handle)