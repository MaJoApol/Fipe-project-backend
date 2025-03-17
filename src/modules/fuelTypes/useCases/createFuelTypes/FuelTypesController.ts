import { container } from "tsyringe";
import { CreateFuelTypeUseCase } from "./FuelTypesUseCase";
import { Response, Request } from "express";
import { CreateFuelTypesDTO } from "../../dtos/CreateFuelTypesDTO";


export class CreateFuelTypeController {
    async handle(request: Request, response: Response): Promise<Response>{
        const data: CreateFuelTypesDTO = request.body;
        const createFuelTypeUseCase = container.resolve(CreateFuelTypeUseCase);
        await createFuelTypeUseCase.execute(data);
        return response.status(201).json({});
    }
}
 