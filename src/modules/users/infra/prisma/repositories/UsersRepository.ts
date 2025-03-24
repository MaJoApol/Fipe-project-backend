
import { UsersDTO } from "../../../dtos/UsersDTO";
import { prisma } from "../../../../../shared/infra/prisma";
import { UpdateUserDTO } from "../../../dtos/UpdateUserDTO";
import { CreateUserDTO } from "../../../dtos/CreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository{
   
    async create(data: CreateUserDTO): Promise<UsersDTO>{
        return (await prisma.users.create({data})) as UsersDTO;
    }
    
    async update(data: UpdateUserDTO): Promise<UsersDTO>{
        data.updatedAt = new Date();
        return (await prisma.users.update({
            where: {id: data.id},
            data
        })) as UsersDTO;
    }

    async remove(id: string, performer: string): Promise<void>{
        await prisma.users.update({
            where: {id},
            data: {
                isDeleted: true,
                deletedById: performer,
                deletedAt: new Date()
            }
        }) as UsersDTO
    }

    async list({page}: {page:number}){
        return (await prisma.users.findMany({
            skip: (page - 1) * 10,
            take: 10,
            orderBy: [{
                createdAt: "asc"
            }]
        })) as UsersDTO[];
    }

    async findById(id: string): Promise<UsersDTO>{
        return (await prisma.users.findUnique({
            where: {id, isDeleted: false}
        })) as UsersDTO;
    }
    
    async findExistingUsers(data: CreateUserDTO): Promise<UsersDTO[]>{
        return (await prisma.users.findMany({
            where: {
                nationalId: data.nationalId,
                email: data.email,
                isDeleted: false
            }
        }));
    }

    async findByEmail(email: string): Promise<UsersDTO>{
        return (await prisma.users.findUnique({
            where: {email: email, isDeleted: false}
        })) as UsersDTO;
    }

     async updateToken(id: string, token: string): Promise<UsersDTO>{
        return (await prisma.users.update({
            where: {id},
            data: {
                token: token
            }
        })) as UsersDTO;

     }


}