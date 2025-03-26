import { Response, Request } from "express";
import { container } from "tsyringe";
import { ListFuelTypesUseCase } from "./listFuelTypesUseCase";
import { PaginatioQueryDTO } from "../../../../shared/dtos/PaginationQueryDTO";


export class ListFuelTypesController{
    async handle(request: Request, response: Response){
        try {
            const {page = 1, pageSize = 10} = request.query as unknown as PaginatioQueryDTO;
            const listFuelTypesUseCase= container.resolve(ListFuelTypesUseCase);
            const fuelTypes = await listFuelTypesUseCase.execute(page, pageSize);
    
            return response.status(200).json({message: "Listado com sucesso!", fuelTypes});
        } catch (error) {
            return response.status(400).json({message: "Erro ao listar"});
        }

    }
}