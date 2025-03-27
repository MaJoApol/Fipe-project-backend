import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AuthenticateUserDTO } from "../../dtos/AuthenticateUserDTO";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import  auth  from "../../../../config/auth"
import { addDays } from "../../../../utils/addTime";  
import { UserAuthResponseDTO } from "../../dtos/UserAuthResponseDTO";

@injectable()
export class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ){}
    async execute(data: AuthenticateUserDTO): Promise<UserAuthResponseDTO>{
        const existingUser = await this.usersRepository.findByEmail(data.email);
        if (!existingUser){
   
            throw new Error("E-mail não cadastrado.")
        }
        if (!data.password){
     
            throw new Error("Forneça uma senha!")
        }

        const passwordMatch = await compare(data.password, existingUser.password)

        if (!passwordMatch){
            throw new Error ("Credenciais incorretas!")
        }

        const token = sign(
            {
                email: existingUser.email
            },
            auth.secret_token,
            {
                subject: existingUser.id,
                expiresIn: "15m"
            });
        
        const refreshToken = sign(
            {
                email: existingUser.email
            },
            auth.secret_refresh_token,
            {
                subject: existingUser.id,
                expiresIn: "5d"
            });

        const expire_in_token = addDays(auth.expires_in_token_days).getTime(); // aqui ele pega o tempo que vai levar até expirar em milissegundos

        await this.usersRepository.updateToken(existingUser.id, refreshToken);
        const userAuthResponseDTO: UserAuthResponseDTO = {
            user: existingUser,
            token,
            refreshToken, 
            tokenTime: expire_in_token
        }
        

        return userAuthResponseDTO;
        
    }
}