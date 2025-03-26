import { Request, Response } from "express";
import { DeleteUserUseCase } from "./deleteUserUseCase";
import { container } from "tsyringe";

export class DeleteUserController{
    async handle(request: Request, response: Response): Promise<Response>{
        try {
            const {id} = request.params;
            console.log("req", request.params)
            console.log("id", request.params.id)
            const tokenId = request.headers.authorization || ''
            const deleteUserUseCase = container.resolve(DeleteUserUseCase);
            await deleteUserUseCase.execute(id, tokenId);
            return response.status(204).json({message: "Deletado com sucesso!"});            
        } catch (error) {
            return response.status(400).json({message: "Erro ao deletar."});
        }
    }
}