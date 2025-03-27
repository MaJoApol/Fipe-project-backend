
import { Response, Request } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./refreshTokenUseCase";
import { RefreshTokenDTO } from "../../dtos/RefreshTokenDTO";



export class RefreshTokenController{
    async handle(request: Request, response: Response): Promise<Response>{
        const data: RefreshTokenDTO = request.body;
        const refreshTokenUserUseCase = container.resolve(RefreshTokenUseCase);
        const authResponse = await refreshTokenUserUseCase.execute(data);
        return response.status(200).json({authResponse})
    }
}

