import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateBrandUseCase } from "./UpdateBrandUseCase";
import { UpdateBrandDTO } from "../../dtos/UpdateBrandDTO";


export class UpdateBrandController{
    async handle(request: Request, response: Response){
        const {id} = request.params;
        const data: UpdateBrandDTO = request.body;
        data.id = id
        const tokenId = request.headers.authorization || "";
        const updateBrandUseCase = container.resolve(UpdateBrandUseCase);
        await updateBrandUseCase.execute(data, tokenId);
        return response.status(204).json({message: "Criado com sucesso!"}) 
    }
}