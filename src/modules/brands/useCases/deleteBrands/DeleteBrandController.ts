import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteBrandUseCase } from "./DeleteBrandUseCase";

export class DeleteBrandController{
    async handle(request: Request, response: Response){
        try {
            const {id} = request.params;
            const tokenId = request.headers.authorization || "";
            const deleteBrandUseCase = container.resolve(DeleteBrandUseCase);
            await deleteBrandUseCase.execute(id, tokenId)
            return response.status(204).json({message: "Deletado com sucesso!"})
        } catch (error) {
            return response.status(400).json({message: "Erro ao deletar."})
        }
}}