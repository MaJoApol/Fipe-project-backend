import { Request, Response } from "express";
import { UpdateUserDTO } from "../../dtos/UpdateUserDTO";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController{
    async handle(request: Request, response: Response){
        try {
            const {id} = request.params;
            const data: UpdateUserDTO = request.body;
            data.id = id
            const tokenId = request.headers.authorization || '';
            const updateUserUseCase = container.resolve(UpdateUserUseCase);
            const updatedUser = await updateUserUseCase.execute(data, tokenId)
            return response.status(200).json({message: "Atualizado com sucesso!", data});            
        } catch (error) {
            return response.status(400).json({message: "Erro ao atualizar."});  
        }

    }
}