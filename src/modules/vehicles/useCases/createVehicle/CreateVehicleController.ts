import { Request, Response } from "express";
import { CreateVehicleDTO } from "../../dtos/CreateVehicleDTO";
import { container } from "tsyringe";
import { CreateVehicleUseCase } from "./CreateVehicleUseCase";

export class CreateVehicleController{
    async handle(request: Request, response: Response){
        try {
            const data: CreateVehicleDTO = request.body;
            const tokenId = request.headers.authorization || "";
            const createVehicleUseCase = container.resolve(CreateVehicleUseCase);
            await createVehicleUseCase.execute(data, tokenId)
            return response.status(201).json({message: "Criado com sucesso!"})    
        } catch (error) {
            return response.status(400).json({message: "Erro ao criar veículo."})  
        }

    }
}