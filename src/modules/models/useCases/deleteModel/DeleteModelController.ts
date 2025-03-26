import { Request, Response } from "express";
import { DeleteModelUseCase } from "./DeleteModelUseCase";
import { container } from "tsyringe";

export class DeleteModelController{
    async handle(request: Request, response: Response){
        try {
            const {id} = request.params;
            const tokenId = request.headers.authorization || " ";
            const deleteModelUseCase = container.resolve(DeleteModelUseCase);
            await deleteModelUseCase.execute(id, tokenId);
            return response.status(204).json({message: "Deletado com sucesso!"})
        } catch (error) {
            return response.status(400).json({message: "Erro ao deletar."})
        }
    }
}