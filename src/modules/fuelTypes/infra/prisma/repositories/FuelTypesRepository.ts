import { prisma } from "../../../../../shared/prisma";
import { CreateFuelTypesDTO } from "../../../dtos/CreateFuelTypesDTO";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";


export class FuelTypesRepository {
    async create(data: CreateFuelTypesDTO): Promise<FuelTypesDTO> {
        return (await prisma.fuelTypes.create({
            data
        })) as FuelTypesDTO;
    }
}