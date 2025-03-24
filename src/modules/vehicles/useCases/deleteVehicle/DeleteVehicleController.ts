import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteVehicleUseCase } from "./DeleteVehicleUseCase";

export class DeleteVehicleController{
    async handle(request: Request, response: Response){
        const {id} =  request.params;
        const tokenId = request.headers.authorization || "";
        const deleteVehicleUseCase = container.resolve(DeleteVehicleUseCase)
        await deleteVehicleUseCase.execute(id, tokenId)
        return response.status(204).json({message: "Deletado com sucesso"})
    }
}