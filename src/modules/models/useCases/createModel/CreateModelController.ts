import { Request, Response } from "express";
import { CreateModelDTO } from "../../dtos/CreateModelDTO";
import { container } from "tsyringe";
import { CreateModelUseCase } from "./CreateModelUseCase";

export class CreateModelController{
    async handle(request: Request, response: Response){
        try {
            const data: CreateModelDTO = request.body;
            const tokenId = request.headers.authorization || "";
            const createModelUseCase = container.resolve(CreateModelUseCase);
            await createModelUseCase.execute(data, tokenId)
            return response.status(201).json({message: "Criado com sucesso!"})
        } catch (error) {
            return response.status(400).json({message: "Erro ao criar modelo."})
        }
    }
}
