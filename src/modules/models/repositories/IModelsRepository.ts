import { ModelDTO } from "../dtos/ModelDTO";
import { CreateModelDTO } from "../dtos/CreateModelDTO";
import { UpdateModelDTO } from "../dtos/UpdateModelDTO";

export interface IModelsRepository{
    create(data: CreateModelDTO): Promise<ModelDTO>;
    update(data: UpdateModelDTO): Promise<ModelDTO>;
    list(page: number, pageSize: number): Promise<ModelDTO[]>;
    remove(id: string, performer: string): Promise<void>;
    findById(id: string): Promise<ModelDTO | null>;
    findExistingModels(name: string): Promise<ModelDTO[]>;
    findModelsByBrand(brandId: string): Promise<ModelDTO[]>;
}