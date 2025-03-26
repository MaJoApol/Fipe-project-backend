import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListModelUseCase } from "./ListModelUseCase";

export class ListModelController {
    async handle(request: Request, response: Response) {
        try {
            const listModelUseCase = container.resolve(ListModelUseCase);
            const models = await listModelUseCase.execute(1, 10);
            return response.status(200).json({message: "Listado com sucesso!", models});
        } catch (error) {
            return response.status(400).json({message: "Erro ao listar."});
        }
    }
}