import { Router } from "express";
import { AuthenticateUserController } from "../useCases/authenticateUser.ts/AuthenticateUserController";

import { CreateUserController } from "../useCases/createUser.ts/CreateUserController";
import { RefreshTokenController } from "../useCases/refreshToken.ts/RefreshTokenController";

const authenticateUserController = new AuthenticateUserController;
const createUserController = new CreateUserController;
const refreshTokenController = new RefreshTokenController;

export const authenticateRoutes = Router();

authenticateRoutes.post("/login", authenticateUserController.handle)
authenticateRoutes.post("/register", createUserController.handle)
authenticateRoutes.post("/refresh", refreshTokenController.handle)

