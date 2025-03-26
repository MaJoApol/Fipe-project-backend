import { inject, injectable } from "tsyringe";
import { UpdateModelDTO } from "../../dtos/UpdateModelDTO";
import { findTokenId } from "../../../../utils/findTokenId";
import { IModelsRepository } from "../../repositories/IModelsRepository";

@injectable()
export class UpdateModelUseCase{
    constructor(
        @inject("ModelsRepository")
        private modelsRepository: IModelsRepository
    ){}
    async execute(data: UpdateModelDTO, tokenId: string){
        const modalExists = await this.modelsRepository.findById(data.id);
        if(!modalExists){
            throw new Error("Modelo não existe!");
        }
        const performedBy = findTokenId(tokenId);
        data.updatedById = performedBy
        return await this.modelsRepository.update(data);
    }
}