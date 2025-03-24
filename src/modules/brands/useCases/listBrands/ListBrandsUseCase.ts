import { inject, injectable } from "tsyringe";
import { BrandDTO } from "../../dtos/BrandDTO";
import { IBrandsRepository } from "../../repositories/IBrandsRepository";


@injectable()
export class ListBrandUseCase{
    constructor(
        @inject("BrandsRepository")
        private brandsRepository: IBrandsRepository
    ){}
    async execute(): Promise<BrandDTO[]>{
        const brands = await this.brandsRepository.list({page: 1});
        return brands;
    }
}