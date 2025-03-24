import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateModelDTO } from "../../dtos/UpdateModelDTO";
import { UpdateModelUseCase } from "./UpdateModelUseCase";

export class UpdateModelController{
    async handle(request: Request, response: Response){
        const {id} = request.params;
        const data: UpdateModelDTO = request.body;
        data.id = id;
        const tokenId = request.headers.authorization || "";
        const updateModelUseCase = container.resolve(UpdateModelUseCase);
        await  updateModelUseCase.execute(data, tokenId);
        return response.status(200).json({message: "Atualizado com sucesso", data})
    }
}