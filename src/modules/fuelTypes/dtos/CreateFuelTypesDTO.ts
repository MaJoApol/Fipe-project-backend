import { FuelTypes } from "@prisma/client";
import { FuelTypesDTO } from "./FuelTypesDTO";

export interface CreateFuelTypesDTO extends Omit<FuelTypesDTO, "id" | "createdAt "> {}