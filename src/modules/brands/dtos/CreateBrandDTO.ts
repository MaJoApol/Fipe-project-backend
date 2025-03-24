import { BrandDTO } from "./BrandDTO";


export interface CreateBrandDTO extends Pick<BrandDTO, "name" >{
    createdById? : string;
}