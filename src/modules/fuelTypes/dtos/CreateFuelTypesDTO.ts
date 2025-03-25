import { FuelTypes } from "@prisma/client";
import { FuelTypesDTO } from "./FuelTypesDTO";

export interface CreateFuelTypesDTO extends Pick<FuelTypesDTO, "name" | "abbreviation"> {
    createdById?: string;
}