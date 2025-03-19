import { Response, Request } from "express";
import { AuthenticateUserDTO } from "../../dtos/AuthenticateUserDTO";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


export class AuthenticateUserController{
    async handle(request: Request, response: Response): Promise<Response>{
        const data: AuthenticateUserDTO = request.body;
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
        await authenticateUserUseCase.execute(data);
        return response.status(201).json({})
    }
}