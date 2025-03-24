import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListModelUseCase } from "./ListModelUseCase";

export class ListModelController {
    async handle(request: Request, response: Response) {
        const listModelUseCase = container.resolve(ListModelUseCase);
        const models = await listModelUseCase.execute();
        return response.status(200).json(models);

    }
}