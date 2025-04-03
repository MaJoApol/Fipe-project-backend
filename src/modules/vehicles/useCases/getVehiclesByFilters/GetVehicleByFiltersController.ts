import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetVehiclesByFiltersUseCase } from "./GetVehicleByFiltersUseCase";

export class GetVehicleByFiltersController{
    async handle(request: Request, response: Response){
         try {
            const filters = request.body;
            const getVehiclesByFiltersUseCase = container.resolve(GetVehiclesByFiltersUseCase);
            const vehicles = await getVehiclesByFiltersUseCase.execute(filters);
            return response.status(200).json({message: "Listado com sucesso!", vehicles});
        } catch (error) {
            return response.status(404).json({message: "Não há veículos cadastrados"} );
        }
    }
}