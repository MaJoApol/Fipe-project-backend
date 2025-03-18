import { Router } from "express";

import { fuelTypesRoutes } from "../../../../modules/fuelTypes/routes/FuelTypesRoutes"; 
import { userRoutes } from "../../../../modules/users/routes/UsersRoutes";


export const routes = Router();

routes.use("/fuelTypes", fuelTypesRoutes);

routes.use("/users", userRoutes);

