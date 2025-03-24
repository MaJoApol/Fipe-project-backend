import { Router } from "express";

import { fuelTypesRoutes } from "../../../../modules/fuelTypes/routes/FuelTypesRoutes"; 
import { userRoutes } from "../../../../modules/users/routes/UsersRoutes";
import { authenticateRoutes } from "../../../../modules/users/routes/AuthenticateRoutes";
import { brandsRoutes } from "../../../../modules/brands/routes/BrandsRoutes";
import { modelsRoutes } from "../../../../modules/models/routes/ModelsRoutes";


export const routes = Router();

routes.use("/fuelTypes", fuelTypesRoutes);
routes.use("/auth", authenticateRoutes)
routes.use("/users", userRoutes);
routes.use("/brands", brandsRoutes)
routes.use("/models", modelsRoutes)


