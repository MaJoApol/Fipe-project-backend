
import { container } from "tsyringe";

import { IFuelTypesRepository } from "../../modules/fuelTypes/repositories/IFuelTypesRepository";
import { FuelTypesRepository } from "../../modules/fuelTypes/infra/prisma/repositories/FuelTypesRepository";
container.registerSingleton<IFuelTypesRepository>("FuelTypesRepository", FuelTypesRepository);

import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/infra/prisma/repositories/UsersRepository";
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)

import { IBrandsRepository } from "../../modules/brands/repositories/IBrandsRepository";
import { BrandsRepository } from "../../modules/brands/infra/prisma/repositories/brandsRepository";
container.registerSingleton<IBrandsRepository>("BrandsRepository", BrandsRepository)

import { IModelsRepository } from "../../modules/models/repositories/IModelsRepository";
import { ModelsRepository } from "../../modules/models/infra/prisma/repositories/ModelsRepository";
container.registerSingleton<IModelsRepository>("ModelsRepository", ModelsRepository)