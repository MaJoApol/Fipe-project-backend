import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UpdateUserDTO } from "../../dtos/UpdateUserDTO";
import { findTokenId } from "../../../../utils/findTokenId";
import { Request } from "express";

@injectable()
export class UpdateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(data: UpdateUserDTO, request: Request, tokenId: string){
        if (!tokenId)
        {
            throw new Error("Token inexistente.")
        }

        const userExists = this.usersRepository.findById(data.id);
        if (!userExists){
            throw new Error("Usuário não existe.")
        }

        const performedById = findTokenId(tokenId);
        data.updatedBy = performedById

        if(data.id !== performedById && data.password){
            throw new Error("Você só pode alterar a senha do seu próprio usuário.")
        }

        return await this.usersRepository.update(data)
    }
}