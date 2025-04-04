import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetVehiclesByFiltersUseCase } from "./GetVehicleByFiltersUseCase";

export class GetVehiclesByFiltersController{
    async handle(request: Request, response: Response){
         try {
            const filters = request.body;
            console.log(filters)
            const {modelId} =  request.params;
            const getVehiclesByFiltersUseCase = container.resolve(GetVehiclesByFiltersUseCase);
            const vehicles = await getVehiclesByFiltersUseCase.execute(modelId, filters);
            return response.status(200).json({message: "Listado com sucesso!", vehicles});
        } catch (error) {
            console.log(error)
            return response.status(500).json({message: error} );
        }
    }
}