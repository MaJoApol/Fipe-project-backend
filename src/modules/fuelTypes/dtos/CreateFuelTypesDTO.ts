import { FuelTypes } from "@prisma/client";

export interface CreateFuelTypesDTO extends Omit<FuelTypes, "id" | "createdAt "> {}