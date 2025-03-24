import { Request, Response} from "express";
import { UpdateFuelTypesDTO } from "../../dtos/UpdateFuelTypesDTO";
import { container } from "tsyringe";
import { UpdateFuelTypeUseCase } from "./UpdateFuelTypesUseCase";


export class UpdateFuelTypeController{
    async handle(request: Request, response: Response){
        const {id} = request.params;
        const data: UpdateFuelTypesDTO = request.body;
        const tokenId = request.headers.authorization || "";
        data.id = id
        const updateFuelTypeUseCase = container.resolve(UpdateFuelTypeUseCase);
        const updateFuelTypes = await updateFuelTypeUseCase.execute(data, tokenId);
        response.status(200).json({message: "Atualizado com sucesso!", data});
    }
}