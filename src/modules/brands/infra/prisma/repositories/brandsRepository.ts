import { prisma } from "../../../../../shared/infra/prisma";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { CreateBrandDTO } from "../../../dtos/CreateBrandDTO";
import { UpdateBrandDTO } from "../../../dtos/UpdateBrandDTO";
import { IBrandsRepository } from "../../../repositories/IBrandsRepository";

export class BrandsRepository implements IBrandsRepository{

    async create(data: CreateBrandDTO): Promise<BrandDTO>{
        return ( await prisma.brands.create({data})) as BrandDTO;
    }

    async update(data: UpdateBrandDTO): Promise<BrandDTO>{
        data.updatedAt = new Date();
        return (await prisma.brands.update({
            where: {id: data.id},
            data
        })) as BrandDTO;
    }
    async remove(id: string, performer: string): Promise<void>{
        await prisma.brands.update({
            where: {id},
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                deletedById: performer
            }
        })
    }

    async findById(id: string): Promise<BrandDTO | null> {
        return ( await prisma.brands.findUnique({
            where: {id, isDeleted: false}
        })) as BrandDTO;
    }

    async findExistingBrands(name: string): Promise<BrandDTO[]>{ 
        return ( await prisma.brands.findMany({
            where: {name, isDeleted: false} // ---> se houver, não criar, else, criar
        })) as BrandDTO[];
    }

    async list(page: number, pageSize: number){
        return (await prisma.brands.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy:[
                {
                    createdAt: 'asc'
                }
            ]
        })) as BrandDTO[];
    }
}