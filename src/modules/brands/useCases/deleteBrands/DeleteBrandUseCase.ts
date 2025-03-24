import { inject, injectable } from "tsyringe";
import { IBrandsRepository } from "../../repositories/IBrandsRepository"; 
import { findTokenId } from "../../../../utils/findTokenId";

@injectable()
export class DeleteBrandUseCase{
    constructor(
        @inject("BrandsRepository")
        private brandsRepository: IBrandsRepository
    ){}

    async execute(id: string, tokenId: string): Promise<void>{
        const brandExists = await this.brandsRepository.findById(id);
        if (!brandExists){
            throw new Error("Marca não existe!")
        }

        const performer = findTokenId(tokenId)

        return await this.brandsRepository.remove(id, performer)

    }
}