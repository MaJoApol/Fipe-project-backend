import { prisma } from "../../../../../shared/infra/prisma";
import { ModelDTO } from "../../../dtos/ModelDTO";
import { CreateModelDTO } from "../../../dtos/CreateModelDTO";
import { UpdateModelDTO } from "../../../dtos/UpdateModelDTO";
import { IModelsRepository } from "../../../repositories/IModelsRepository";

export class ModelsRepository implements IModelsRepository{

    async create(data: CreateModelDTO): Promise<ModelDTO>{
        return ( await prisma.models.create({data})) as ModelDTO;
    }

    async update(data: UpdateModelDTO): Promise<ModelDTO>{
        data.updatedAt = new Date();
        return (await prisma.models.update({
            where: {id: data.id},
            data
        })) as ModelDTO;
    }
    async remove(id: string, performer: string): Promise<void>{
        await prisma.models.update({
            where: {id},
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                deletedById: performer
            }
        })
    }

    async findById(id: string): Promise<ModelDTO | null>{
        return ( await prisma.models.findUnique({
            where: {id, isDeleted: false}
        })) as ModelDTO;
    }

    async findExistingModels(name: string): Promise<ModelDTO[]>{ 
        return ( await prisma.models.findMany({
            where: {name, isDeleted: false} // ---> se houver, não criar, else, criar
        })) as ModelDTO[];
    }

    async list(pageSize: number, page: number){
        return (await prisma.models.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy:[
                {
                    createdAt: 'asc'
                }
            ]
        })) as ModelDTO[];
    }

    async findModelsByBrand(brandId: string): Promise<ModelDTO[]>{
        return ( await prisma.models.findMany({
            where: {brandId: brandId, isDeleted: false}
        }))
    }
}

