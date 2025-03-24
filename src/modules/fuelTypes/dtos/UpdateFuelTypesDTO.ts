import { FuelTypes } from "@prisma/client"; 
import { FuelTypesDTO } from "./FuelTypesDTO";

export interface UpdateFuelTypesDTO extends Pick<FuelTypesDTO, "id" | "name" | "abbreviation"> {
    updatedById?: string;
    updatedAt?: Date;
}