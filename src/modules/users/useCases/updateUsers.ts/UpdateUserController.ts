import { Request, Response } from "express";
import { UpdateUserDTO } from "../../dtos/UpdateUserDTO";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController{
    async handle(request: Request, response: Response){
        const {id} = request.params;
        const data: UpdateUserDTO = request.body;
        data.id = id
        const tokenId = request.headers.authorization || '';

        const updateUserUseCase = container.resolve(UpdateUserUseCase);
        return response.status(204).json(await updateUserUseCase.execute(data, request, tokenId));
    }
}