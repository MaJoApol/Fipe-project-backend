import { Request, Response } from "express";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


export class CreateUserController{

    async handle(request: Request, response: Response): Promise<Response> {
        const data: CreateUserDTO =  request.body;
        const createUserUsecase =  container.resolve(CreateUserUseCase);
        await createUserUsecase.execute(data);
        return response.status(201).json({});
    }
}