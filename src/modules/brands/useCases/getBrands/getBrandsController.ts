import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetBrandsUseCase } from "./getBrandsUseCase";

export class GetBrandsController{
    async handle(request: Request, response: Response){
         try {
            const getBrandsUseCase = container.resolve(GetBrandsUseCase);
            const brands = await getBrandsUseCase.execute();
            return response.status(200).json({message: "Listado com sucesso!", brands});
        } catch (error) {
            return response.status(404).json({message: "Não há marcas cadastradas"} );
        }
    }
}