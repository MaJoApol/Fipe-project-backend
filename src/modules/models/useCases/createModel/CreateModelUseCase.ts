import { inject, injectable } from "tsyringe";
import { CreateModelDTO } from "../../dtos/CreateModelDTO";
import { ModelDTO } from "../../dtos/ModelDTO";
import { findTokenId } from "../../../../utils/findTokenId";
import { ModelsRepository } from "../../infra/prisma/repositories/ModelsRepository";

@injectable()
export class CreateModelUseCase{
    constructor(
        @inject("ModelsRepository")
        private modelsRepository: ModelsRepository
    ){}
    async execute(data: CreateModelDTO, tokenId: string): Promise<ModelDTO>{
        const modelExists = await this.modelsRepository.findExistingModels(data.name)
        if ((modelExists).length > 0){
            throw new Error ("Modelo já existe")
        }

        const createModel: CreateModelDTO = {
            name: data.name,
            brandId: data.brandId
        }

        if(tokenId !== ''){
            const creatorId = findTokenId(tokenId);
            createModel.createdById = creatorId;
        }
        return await this.modelsRepository.create(createModel)
    }
}