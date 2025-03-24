import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserUseCase } from "./ListUserUseCase";

export class ListUserController{
    async handle(request: Request, response: Response){
        const listUserUseCase = container.resolve(ListUserUseCase);
        const listResponse = await listUserUseCase.execute();
        return response.status(200).json({listResponse})
    }
}



