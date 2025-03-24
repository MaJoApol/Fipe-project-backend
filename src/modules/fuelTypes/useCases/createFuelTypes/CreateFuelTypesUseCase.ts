import { inject, injectable } from "tsyringe";

import { IFuelTypesRepository } from "../../repositories/IFuelTypesRepository";
import { CreateFuelTypesDTO } from "../../dtos/CreateFuelTypesDTO";
import { FuelTypesDTO } from "../../dtos/FuelTypesDTO";
import { findTokenId } from "../../../../utils/findTokenId";

@injectable()
export class CreateFuelTypeUseCase {
    constructor(
        @inject("FuelTypesRepository")
        private fuelTypesRepository: IFuelTypesRepository
    ){}

    async execute(data: CreateFuelTypesDTO, tokenId: string): Promise<FuelTypesDTO> {
        const existingFuelType = await this.fuelTypesRepository.findExistingFuelType(data);

        if (existingFuelType.length > 0) {
            throw new Error("Combustível já existe")
        }

        const creatorId = findTokenId(tokenId);
        data.createdById = creatorId

        return await this.fuelTypesRepository.create(data)
    }
}
