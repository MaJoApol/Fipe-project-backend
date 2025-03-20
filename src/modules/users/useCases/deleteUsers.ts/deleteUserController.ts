import { Request, Response } from "express";
import { DeleteUserUseCase } from "./deleteUserUseCase";
import { container } from "tsyringe";

export class DeleteUserController{

    async handle(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const tokenId = request.headers.authorization || ''
        const deleteUserUseCase = container.resolve(DeleteUserUseCase);
        await deleteUserUseCase.execute(id, tokenId);
        return response.status(204).json({});
    }

}