import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import  auth  from "../../../../config/auth"
import { addTime } from "../../../../utils/addTime";  
import { verify, sign } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { IAuthTokenPayload } from "../../repositories/IAuthTokenPayload";
import { UserAuthResponseDTO } from "../../dtos/UserAuthResponseDTO";
import { RefreshTokenDTO } from "../../dtos/RefreshTokenDTO";

@injectable()
export class RefreshTokenUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ){}

    async execute(data: RefreshTokenDTO): Promise<UserAuthResponseDTO> {
        const refreshToken = data.refreshToken

        const secretToken = auth.secret_token;
        const secretRefreshToken = auth.secret_refresh_token;

        if(!secretRefreshToken || !secretToken){
            throw new Error("Variáveis de ambiente de autenticação ausentes")
        }

        const {sub}  = verify(
            refreshToken,
            secretRefreshToken
        ) as IAuthTokenPayload;
       
        const user = await this.usersRepository.findById(sub)

        if (!user){
            throw new Error("Usuário não existe!");
        }

        if (user.token !== refreshToken){
            throw new Error("Token de atualização de autenticação inválido");
        }

        const newToken = sign({id: user.id}, secretToken, {expiresIn: "15m"}); 
        // jwt.sign(payload, secretOrPrivateKey, [options, callback]).
        // PAYLOAD(Objeto JavaScript (ou JSON) contendo os dados que serão codificados no token)
        // SecretKey(É a chave usada para assinar o token)

        const newRefreshToken = sign({id: user.id}, secretRefreshToken, {expiresIn: "7200m"});

        const refreshedUser = await this.usersRepository.updateToken(sub, newRefreshToken);

        const expire_in_token = addTime(auth.expires_in_token_minutes);

        const userAuthResponse: UserAuthResponseDTO = {
            user: refreshedUser,
            token: newToken,
            refreshToken: newRefreshToken, 
            tokenTime: expire_in_token
        }
        
        return userAuthResponse;

    }
}