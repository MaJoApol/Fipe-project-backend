
import { container } from "tsyringe";



import { IFuelTypesRepository } from "../../modules/fuelTypes/repositories/IFuelTypesRepository";
import { FuelTypesRepository } from "../../modules/fuelTypes/infra/prisma/repositories/FuelTypesRepository";
container.register<IFuelTypesRepository>("FuelTypesRepository", FuelTypesRepository)