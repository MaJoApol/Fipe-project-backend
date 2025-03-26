import { prisma } from "../../../../../shared/infra/prisma";
import { CreateFuelTypesDTO } from "../../../dtos/CreateFuelTypesDTO";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";
import { UpdateFuelTypesDTO } from "../../../dtos/UpdateFuelTypesDTO";
import { IFuelTypesRepository } from "../../../repositories/IFuelTypesRepository";


export class FuelTypesRepository implements IFuelTypesRepository {
    async create(data: CreateFuelTypesDTO): Promise<FuelTypesDTO> {
        return (await prisma.fuelTypes.create({
            data
        })) as FuelTypesDTO;
    }

    async remove(id:string, performer: string): Promise<void>{
        await prisma.fuelTypes.update({
            where: {id},
            data: {
                deletedById: performer,
                isDeleted: true,
                deletedAt: new Date()
            }
        })
    }

    async update(data: UpdateFuelTypesDTO): Promise<FuelTypesDTO>{
        data.updatedAt = new Date();
        return (await prisma.fuelTypes.update({
            where: {id: data.id},
            data
        })) as FuelTypesDTO
    }

    async findById(id: string): Promise<FuelTypesDTO | null>{
        const fuelTypes = (await prisma.fuelTypes.findUnique({
            where: {id, isDeleted: false}
        })) as FuelTypesDTO;
        return fuelTypes
    }

    async findExistingFuelType(data: CreateFuelTypesDTO): Promise<FuelTypesDTO[]>{
        const fuelTypes = (await prisma.fuelTypes.findMany({
            where: {
                name: data.name,
                abbreviation: data.abbreviation,
                isDeleted: false
            }
        })) as FuelTypesDTO[];
        return fuelTypes;
    }

    async list(page: number, pageSize: number){
        return (await prisma.fuelTypes.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy:[
                {
                    createdAt: 'asc'
                }
            ]
        })) as FuelTypesDTO[];
    }
}