import { inject, injectable } from "tsyringe";
import { findTokenId } from "../../../../utils/findTokenId";
import { IModelsRepository } from "../../repositories/IModelsRepository";

@injectable()
export class DeleteModelUseCase{
    constructor(
        @inject("ModelsRepository")
        private modelsRepository: IModelsRepository
    ){}
    async execute(id: string, tokenId: string): Promise<void>{
        const modelExists = await this.modelsRepository.findExistingModels(id);
        if(!modelExists){
            throw new Error("Modelo não existe!")
        }
       
        const performedBy = findTokenId(tokenId)

        return await this.modelsRepository.remove(id, performedBy)
    }
}