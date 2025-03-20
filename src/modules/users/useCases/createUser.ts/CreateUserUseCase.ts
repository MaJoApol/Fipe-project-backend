import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { hash } from "bcrypt";
import { findTokenId } from "../../../../utils/findTokenId";
import { Request } from "express";


@injectable()
export class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(data: CreateUserDTO, request: Request){
        const existingUser = await this.usersRepository.findExistingUsers(data)
        if(existingUser.length > 0 ){
            throw new Error("Usuário já cadastrado")
        }

        const passwordHash = await hash(data.password, 13)

        const creatorId = findTokenId(request.headers.authorization)

        const createUser: CreateUserDTO = {
            name: data.name,         
            birthdate: data.birthdate,  
            contact: data.contact,    
            nationalId: data.nationalId,     
            email: data.email,          
            password: passwordHash
        }

        if (creatorId){
            createUser.createdBy = creatorId    
        }

        return await this.usersRepository.create(createUser);
    }

}