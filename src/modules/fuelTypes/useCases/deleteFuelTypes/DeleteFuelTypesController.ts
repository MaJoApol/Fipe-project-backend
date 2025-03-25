import { Response, Request } from "express";
import { container } from "tsyringe";
import { DeleteFuelTypesUseCase } from "./DeleteFuelTypesUseCase";

export class DeleteFuelTypesController{
    async handle(request: Request, response: Response): Promise<Response>{
        try {
            const {id} = request.params;
            const tokenId = request.headers.authorization || "";
            const deleteFuelTypesUseCase = container.resolve(DeleteFuelTypesUseCase);
            await deleteFuelTypesUseCase.execute(id, tokenId);
            return response.status(204).json({message: "Deletado com sucesso!"});
        } catch (error) {
            return response.status(400).json({message: "Erro ao deletar."});
        }
    }
}