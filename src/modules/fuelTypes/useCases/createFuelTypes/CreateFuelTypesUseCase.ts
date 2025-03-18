import { inject, injectable } from "tsyringe";

import { IFuelTypesRepository } from "../../repositories/IFuelTypesRepository";
import { CreateFuelTypesDTO } from "../../dtos/CreateFuelTypesDTO";
import { FuelTypesDTO } from "../../dtos/FuelTypesDTO";

@injectable()
export class CreateFuelTypeUseCase {
    constructor(
        @inject("FuelTypesRepository")
        private fuelTypesRepository: IFuelTypesRepository
    ){}

    async execute(data: CreateFuelTypesDTO): Promise<FuelTypesDTO> {
        const existingFuelType = await this.fuelTypesRepository.findExistingFuelType(data);

        if (existingFuelType.length > 0) {
            throw new Error("Combustível já existe")
        }

        return await this.fuelTypesRepository.create(data)
    }
}
