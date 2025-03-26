import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { findTokenId } from "../../../../utils/findTokenId";

@injectable()
export class DeleteUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(id: string, tokenId: string){
        if (!tokenId || tokenId === ''){
            throw new Error("Token inexistente")
        }

        const usersExists = await this.usersRepository.findById(id);

        if (!usersExists){
            throw new Error("Usuário não existe!")
        }

        const performedById = findTokenId(tokenId);
        
       return await this.usersRepository.remove(id, performedById);
    }
}