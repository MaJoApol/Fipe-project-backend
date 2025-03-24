import { BrandDTO } from "../dtos/BrandDTO";
import { CreateBrandDTO } from "../dtos/CreateBrandDTO";
import { UpdateBrandDTO } from "../dtos/UpdateBrandDTO";


export interface IBrandsRepository{
    create(data: CreateBrandDTO): Promise<BrandDTO>;
    update(data: UpdateBrandDTO): Promise<BrandDTO>;
    list(data: {page: number}): Promise<BrandDTO[]>;
    remove(id: string, performer: string): Promise<void>;
    findById(id: string): Promise<BrandDTO>;
    findExistingBrands(name: string): Promise<BrandDTO[]>;
}