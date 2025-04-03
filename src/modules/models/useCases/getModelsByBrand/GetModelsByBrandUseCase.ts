
import { inject, injectable } from "tsyringe";
import { IModelsRepository } from "../../repositories/IModelsRepository";
import { ModelDTO } from "../../dtos/ModelDTO";

@injectable()
export class GetModelsByBrandUseCase{
    constructor(
        @inject('ModelsRepository')
        private modelsRepository : IModelsRepository
    ){}

    async execute(brandId: string): Promise<ModelDTO[]>{
        const models = await this.modelsRepository.findModelsByBrand(brandId)
        return brandId ? models : []
    }
}