import { ModelDTO } from "./ModelDTO";


export interface CreateModelDTO extends Pick<ModelDTO, "name" | "brandId" >{
    createdById? : string;
}