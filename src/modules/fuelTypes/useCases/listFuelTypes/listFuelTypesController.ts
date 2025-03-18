import { Response, Request } from "express";
import { container } from "tsyringe";
import { ListFuelTypesUseCase } from "./listFuelTypesUseCase";


export class ListFuelTypesController{
    async handle(request: Request, response: Response){

        const listFuelTypesUseCase= container.resolve(ListFuelTypesUseCase);
        const fuelTypes = await listFuelTypesUseCase.execute();

        return response.status(200).json(fuelTypes);
    }
}