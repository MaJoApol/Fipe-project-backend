import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListBrandUseCase } from "./ListBrandsUseCase";

export class ListBrandController {
    async handle(request: Request, response: Response) {
        
        const listBrandUseCase = container.resolve(ListBrandUseCase);
        const brands = await listBrandUseCase.execute();
        return response.status(200).json(brands);

    }
}