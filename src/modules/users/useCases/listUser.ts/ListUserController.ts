import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserUseCase } from "./ListUserUseCase";

export class ListUserController{
    async handle(request: Request, response: Response){
        try {
            const listUserUseCase = container.resolve(ListUserUseCase);
            const listResponse = await listUserUseCase.execute(1, 10);
            return response.status(200).json({message: "Listado com sucesso!", listResponse})
        } catch (error) {
            return response.status(400).json({message: "Erro ao listar."})
        }

    }
}



