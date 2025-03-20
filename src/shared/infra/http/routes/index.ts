import { Router } from "express";

import { fuelTypesRoutes } from "../../../../modules/fuelTypes/routes/FuelTypesRoutes"; 
import { userRoutes } from "../../../../modules/users/routes/UsersRoutes";
import { authenticateRoutes } from "../../../../modules/users/routes/authenticateRoutes";


export const routes = Router();

routes.use("/fuelTypes", fuelTypesRoutes);
routes.use("/auth", authenticateRoutes)
routes.use("/users", userRoutes);

