import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../infra/prisma/repositories/UsersRepository";
import { AuthenticateUserDTO } from "../../dtos/AuthenticateUserDTO";
import { compare } from "bcrypt";

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ){}
    async execute(data: AuthenticateUserDTO): Promise<void>{
        const existingUser = await this.usersRepository.findByEmail(data.email);

        if (!existingUser || !data.password){
            throw new Error("E-mail ou senha incorretos!")
        }

        const passwordMatch = await compare(password, data.password)
        


    }
}