import { inject, injectable } from "tsyringe";
import { BrandsRepository } from "../../infra/prisma/repositories/brandsRepository";
import { CreateBrandDTO } from "../../dtos/CreateBrandDTO";
import { BrandDTO } from "../../dtos/BrandDTO";
import { findTokenId } from "../../../../utils/findTokenId";

@injectable()
export class CreateBrandUseCase{
    constructor(
        @inject("BrandsRepository")
        private brandsRepository: BrandsRepository
    ){}
    async execute(data: CreateBrandDTO, tokenId: string): Promise<BrandDTO>{
        const brandExists = await this.brandsRepository.findExistingBrands(data.name)
        if ((brandExists).length > 0){
            throw new Error ("Marca já existe")
        }
        
        const creatorId = findTokenId(tokenId);
        data.createdById = creatorId
            
        return await this.brandsRepository.create(data)
    }
}