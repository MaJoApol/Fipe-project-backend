import { BrandDTO } from "./BrandDTO";


export interface UpdateBrandDTO extends Pick<BrandDTO, "id" | "name" >{
    updatedById? : string;
    updatedAt?: Date;
}