import { ModelDTO } from "./ModelDTO";


export interface UpdateModelDTO extends Pick<ModelDTO, "id" | "name" >{
    brandId?: string;
    updatedById? : string;
    updatedAt?: Date;
}