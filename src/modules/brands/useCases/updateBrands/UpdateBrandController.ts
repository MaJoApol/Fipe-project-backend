import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateBrandUseCase } from "./UpdateBrandUseCase";
import { UpdateBrandDTO } from "../../dtos/UpdateBrandDTO";


export class UpdateBrandController{
    async handle(request: Request, response: Response){
        try {
            const {id} = request.params;
            const data: UpdateBrandDTO = request.body;
            data.id = id
            const tokenId = request.headers.authorization || "";
            const updateBrandUseCase = container.resolve(UpdateBrandUseCase);
            await updateBrandUseCase.execute(data, tokenId);
            return response.status(200).json({message: "Atualizado com sucesso!", data}) 
            
        } catch (error) {
            return response.status(400).json({message: "Erro ao atualizar"}) 
        }
    }
}