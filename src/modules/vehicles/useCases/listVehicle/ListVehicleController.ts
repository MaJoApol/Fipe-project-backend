import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListVehicleUseCase } from "./ListVehicleUseCase";

export class ListVehicleController{
    async handle(request: Request, response: Response){
        try {
            const listVehicleUseCase = container.resolve(ListVehicleUseCase);
            const listResponse = await listVehicleUseCase.execute(1, 10);
            return response.status(200).json({message: "Listado com sucesso!",listResponse})
        } catch (error) {
            return response.status(400).json({message: "Erro ao listar."})
        }
    }
}



