import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../infra/prisma/repositories/UsersRepository"
import { UsersDTO } from "../../dtos/UsersDTO";

@injectable()
export class ListUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ){}
    async execute(): Promise<UsersDTO[]>{
        return await this.usersRepository.list({page: 1});
    }
}