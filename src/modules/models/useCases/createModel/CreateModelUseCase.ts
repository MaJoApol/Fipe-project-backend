import { inject, injectable } from "tsyringe";
import { CreateModelDTO } from "../../dtos/CreateModelDTO";
import { ModelDTO } from "../../dtos/ModelDTO";
import { findTokenId } from "../../../../utils/findTokenId";
import { IModelsRepository } from "../../repositories/IModelsRepository";

@injectable()
export class CreateModelUseCase{
    constructor(
        @inject("ModelsRepository")
        private modelsRepository: IModelsRepository
    ){}
    async execute(data: CreateModelDTO, tokenId: string): Promise<ModelDTO>{
        const modelExists = await this.modelsRepository.findExistingModels(data.name)
        if ((modelExists).length > 0){
            throw new Error ("Modelo já existe")
        }

        const creatorId = findTokenId(tokenId);
        data.createdById = creatorId;

        return await this.modelsRepository.create(data);
    }
}