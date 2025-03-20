import { container } from "tsyringe";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
 
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController{
    async handle(request: Request, response: Response){
        const data: CreateUserDTO = request.body
        const tokenId = request.headers.authorization || '';
        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute(data, tokenId);
        return response.status(201).json({})
    }
}