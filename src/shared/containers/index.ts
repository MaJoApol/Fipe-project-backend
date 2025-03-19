
import { container } from "tsyringe";

import { IFuelTypesRepository } from "../../modules/fuelTypes/repositories/IFuelTypesRepository";
import { FuelTypesRepository } from "../../modules/fuelTypes/infra/prisma/repositories/FuelTypesRepository";
container.registerSingleton<IFuelTypesRepository>("FuelTypesRepository", FuelTypesRepository);

import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/infra/prisma/repositories/UsersRepository";
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)
