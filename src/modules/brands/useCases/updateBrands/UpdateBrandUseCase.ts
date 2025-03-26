import { inject, injectable } from "tsyringe";
import { findTokenId } from "../../../../utils/findTokenId";
import { BrandsRepository } from "../../infra/prisma/repositories/brandsRepository";
import { UpdateBrandDTO } from "../../dtos/UpdateBrandDTO";

@injectable()
export class UpdateBrandUseCase{
    constructor(
        @inject("BrandsRepository")
        private brandsRepository: BrandsRepository
    ){}
    async execute(data: UpdateBrandDTO, tokenId: string){
        const brandExists = await this.brandsRepository.findById(data.id)
        if(brandExists === null){
            throw new Error("Marca não existe!")
        }

        const performerId = findTokenId(tokenId)
        data.updatedById = performerId


        return await this.brandsRepository.update(data)
    }
}