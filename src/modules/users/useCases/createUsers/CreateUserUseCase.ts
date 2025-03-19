import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { hash } from "bcrypt";


@injectable()
export class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute(data: CreateUserDTO){

        const existingUsers = await this.usersRepository.findExistingUsers(data);
        if(existingUsers.length > 0){
            throw new Error("Usuário já cadastrado")
        }

        const passwordHash = await hash(data.password, 13)

        return await this.usersRepository.create({
            name: data.name,         
            birthdate: data.birthdate,  
            contact: data.contact,    
            nationalId: data.nationalId,     
            email: data.email,          
            password: passwordHash,
            token: ""
        })
    }
}