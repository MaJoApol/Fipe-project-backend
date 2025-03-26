import { inject, injectable } from "tsyringe";
import { CreateModelDTO } from "../../dtos/CreateModelDTO";
import { ModelDTO } from "../../dtos/ModelDTO";
import { findTokenId } from "../../../../utils/findTokenId";
import { IModelsRepository } from "../../repositories/IModelsRepository";
import { IBrandsRepository } from "../../../brands/repositories/IBrandsRepository";

@injectable()
export class CreateModelUseCase{
    constructor(
        @inject("ModelsRepository")
        private modelsRepository: IModelsRepository,
        @inject("BrandsRepository")
        private brandsRepository: IBrandsRepository
    ){}
    async execute(data: CreateModelDTO, tokenId: string): Promise<ModelDTO>{
        const modelExists = await this.modelsRepository.findExistingModels(data.name);
        if ((modelExists).length > 0){
            throw new Error ("Modelo já existe");
        }

        const brandExists = await this.brandsRepository.findById(data.brandId);
        if(brandExists === null){
            throw new Error ("Não há marca com esse Id");
        }

        const creatorId = findTokenId(tokenId);
        data.createdById = creatorId;

        return await this.modelsRepository.create(data);
    }
}