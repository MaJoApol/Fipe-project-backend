import { Response, Request } from "express";
import { container } from "tsyringe";
import { DeleteFuelTypesUseCase } from "./DeleteFuelTypesUseCase";

export class DeleteFuelTypesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const deleteFuelTypesUseCase = container.resolve(DeleteFuelTypesUseCase);
        await deleteFuelTypesUseCase.execute(id);
        return response.status(204).json({});
    }
}