import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateVehicleDTO } from "../../dtos/UpdateVehicleDTO";
import { UpdateVehicleUseCase } from "./UpdateVehicleUseCase";

export class UpdateVehicleController{
    async handle(request: Request, response: Response){
        const data: UpdateVehicleDTO = request.body;
        const {id} = request.params;
        const tokenId = request.headers.authorization || "";
        data.id = id;
        const updateVehicleUseCase = container.resolve(UpdateVehicleUseCase);
        await updateVehicleUseCase.execute(data,tokenId);
        return response.status(200).json({message: "Atualizado com sucesso", data})
    }
}