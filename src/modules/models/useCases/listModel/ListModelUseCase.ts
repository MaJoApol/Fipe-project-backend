import { inject, injectable } from "tsyringe";
import { ModelDTO } from "../../dtos/ModelDTO";
import { IModelsRepository } from "../../repositories/IModelsRepository";

@injectable()
export class ListModelUseCase{
    constructor(
        @inject("ModelsRepository")
        private modelsRepository: IModelsRepository
    ){}
    async execute(): Promise<ModelDTO[]>{
        const models = await this.modelsRepository.list({page: 1});
        return models;
    }
}