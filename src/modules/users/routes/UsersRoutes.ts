import { Router } from "express";
import { ensureAunthenticated } from "../../../shared/infra/http/middleware/ensureAuthenticated";
import { CreateUserController } from "../useCases/createUser.ts/CreateUserController";

const createUserController = new CreateUserController;

export const userRoutes = Router();

userRoutes.post("/post", ensureAunthenticated, createUserController.handle)

