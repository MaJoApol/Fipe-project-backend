
import { prisma } from "../../../../../shared/infra/prisma";
import { CreateVehicleDTO } from "../../../dtos/CreateVehicleDTO";
import { UpdateVehicleDTO } from "../../../dtos/UpdateVehicleDTO";
import { VehicleDTO } from "../../../dtos/VehicleDTO";
import { IVehiclesRepository } from "../../../repositories/IVehiclesRepository";

export class VehiclesRepository implements IVehiclesRepository{

    async create(data: CreateVehicleDTO): Promise<VehicleDTO>{
        return ( await prisma.vehicles.create(
            {data}
        )) as VehicleDTO;
    }

    async update(data: UpdateVehicleDTO): Promise<VehicleDTO>{
        data.updatedAt = new Date();
        return ( await prisma.vehicles.update({
            where: {id: data.id},
            data
        })) as VehicleDTO;
    }

    async remove(id: string, performer: string): Promise<void>{
        await prisma.vehicles.update({
            where: {id},
            data:{
                isDeleted: true,
                deletedAt: new Date,
                deletedById: performer
            }
        }) as VehicleDTO;
    }

    async findExistingVehicles(data: CreateVehicleDTO): Promise<VehicleDTO[]>{
        return ( await prisma.vehicles.findMany({
             where: {
                fuelTypeId: data.fuelTypeId,
                referenceMonth: data.referenceMonth,
                referenceYear: data.referenceYear,
                vehicleYear: data.vehicleYear,
                modelId: data.modelId,
                isDeleted: false
             }
        })) as VehicleDTO[];
    }

    async findById(id: string): Promise<VehicleDTO | null>{
        return await prisma.vehicles.findUnique({
            where: {id, isDeleted: false}
        }) as VehicleDTO;
    }

    async list(page: number, pageSize: number){
        return ( await prisma.vehicles.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: [{
                createdAt: "asc"
            }]
        })) as VehicleDTO[];
    }

}