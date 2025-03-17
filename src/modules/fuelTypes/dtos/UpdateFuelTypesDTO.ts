import { FuelTypes } from "@prisma/client"; 

export interface UpdateFuelTypesDTO extends Omit<FuelTypes, "createdAt " | "updateAt" | "deletedAt" | "updatedBy" | "createdBy" | "deletedBy" | "isDeleted"> {}