import { container } from "tsyringe";
import { Response, Request } from "express";
import { CreateFuelTypesDTO } from "../../dtos/CreateFuelTypesDTO";
import { CreateFuelTypeUseCase } from "./CreateFuelTypesUseCase";


export class CreateFuelTypeController {
    async handle(request: Request, response: Response): Promise<Response>{
        try {
            const data: CreateFuelTypesDTO = request.body;
            const tokenId = request.headers.authorization || "";
            const createFuelTypeUseCase = container.resolve(CreateFuelTypeUseCase);
            await createFuelTypeUseCase.execute(data, tokenId);
            return response.status(201).json({message: "Criado com sucesso!"});
        } catch (error) {
            return response.status(400).json({message: "Erro ao criar a combustível"});
        }
    }
}
 