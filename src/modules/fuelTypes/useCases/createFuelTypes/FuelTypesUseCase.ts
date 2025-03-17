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
        return await this.fuelTypesRepository.create(data)
    }
}
