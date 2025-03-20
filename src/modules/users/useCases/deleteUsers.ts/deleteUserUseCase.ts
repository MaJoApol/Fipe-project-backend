import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { hash } from "bcrypt";
import { findTokenId } from "../../../../utils/findTokenId";
import { Request } from "express";


@injectable()
export class DeleteUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(id: string){
        const usersExists = await this.usersRepository.findById(id);

        if (!usersExists){
            throw new Error("Usuário não existe")
        }
    }

}