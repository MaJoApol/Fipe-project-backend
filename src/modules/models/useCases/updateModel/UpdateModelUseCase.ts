import { inject, injectable } from "tsyringe";
import { ModelsRepository } from "../../infra/prisma/repositories/ModelsRepository";
import { UpdateModelDTO } from "../../dtos/UpdateModelDTO";
import { findTokenId } from "../../../../utils/findTokenId";


@injectable()
export class UpdateModelUseCase{
    constructor(
        @inject("ModelsRepository")
        private modelsRepository: ModelsRepository
    ){}
    async execute(data: UpdateModelDTO, tokenId: string){
        const modalExists = await this.modelsRepository.findExistingModels(data.id);
        if(!modalExists){
            throw new Error("Modelo não existe!");
        }
        const performedBy = findTokenId(tokenId);
        data.updatedById = performedBy
        return await this.modelsRepository.update(data);
    }
}