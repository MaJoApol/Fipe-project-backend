import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetModelsByBrandUseCase } from "./GetModelsByBrandUseCase";

export class GetModelsByBrandController{
    async handle(request: Request, response: Response){
         try {
            const {brandId} = request.params;
            const getModelsByBrandUseCase = container.resolve(GetModelsByBrandUseCase);
            const models = await getModelsByBrandUseCase.execute(brandId);
            return response.status(200).json({message: "Listado com sucesso!", models});
        } catch (error) {
            return response.status(404).json({message: "Não há modelos cadastrados"} );
        }
    }
}