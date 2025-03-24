import { ModelDTO } from "../dtos/ModelDTO";
import { CreateModelDTO } from "../dtos/CreateModelDTO";
import { UpdateModelDTO } from "../dtos/UpdateModelDTO";

export interface IModelsRepository{
    create(data: CreateModelDTO): Promise<ModelDTO>;
    update(data: UpdateModelDTO): Promise<ModelDTO>;
    list(data: {page: number}): Promise<ModelDTO[]>;
    remove(id: string, performer: string): Promise<void>;
    findById(id: string): Promise<ModelDTO>;
    findExistingModels(name: string): Promise<ModelDTO[]>;
}