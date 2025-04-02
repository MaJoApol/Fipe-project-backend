import { inject, injectable } from "tsyringe";
import { IBrandsRepository } from "../../repositories/IBrandsRepository";
import { BrandDTO } from "../../dtos/BrandDTO";



@injectable()
export class GetBrandsUseCase{
    constructor(
        @inject('BrandsRepository')
        private brandsRepository : IBrandsRepository
    ){}

    async execute(): Promise<BrandDTO[]>{
        const brands = await this.brandsRepository.findAllBrands()
        return brands
    }
}