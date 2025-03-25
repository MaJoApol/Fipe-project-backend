import { Request, Response } from "express";
import { CreateBrandDTO } from "../../dtos/CreateBrandDTO";
import { container } from "tsyringe";
import { CreateBrandUseCase } from "./CreateBrandUseCase";

export class CreateBrandController{
    async handle(request: Request, response: Response){
        try {
            const data: CreateBrandDTO = request.body;
            const tokenId = request.headers.authorization || "";
            const createBrandUseCase = container.resolve(CreateBrandUseCase);
            await createBrandUseCase.execute(data, tokenId)
            return response.status(201).json({message: "Criado com sucesso!"})
        } catch (error) {
            return response.status(400).json({message: "Erro ao criar a marca" })
        }
    }
}