import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListBrandUseCase } from "./ListBrandsUseCase";
import { PaginatioQueryDTO } from "../../../../shared/dtos/PaginationQueryDTO";

export class ListBrandController {
    async handle(request: Request, response: Response) {
        try {
            const { page = 1, pageSize = 10} = request.query as unknown as PaginatioQueryDTO;
            const listBrandUseCase = container.resolve(ListBrandUseCase);
            const brands = await listBrandUseCase.execute(page, pageSize);
            return response.status(200).json({message: "Listado com sucesso!", brands});
        } catch (error) {
            return response.status(400).json({message: "Erro ao listar"} );
        }

    }
}