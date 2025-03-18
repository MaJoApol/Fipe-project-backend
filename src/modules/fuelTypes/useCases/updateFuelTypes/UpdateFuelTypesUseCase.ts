import { inject, injectable } from "tsyringe";
import { FuelTypesRepository } from "../../infra/prisma/repositories/FuelTypesRepository";
import { UpdateFuelTypesDTO } from "../../dtos/UpdateFuelTypesDTO";
import { FuelTypesDTO } from "../../dtos/FuelTypesDTO";


@injectable()
export class UpdateFuelTypeUseCase{
    constructor(
        @inject("FuelTypesRepository")
        private fuelTypesRepository: FuelTypesRepository
    ){}

    async execute(data: UpdateFuelTypesDTO): Promise<FuelTypesDTO>{
        const fuelTypeExists= await this.fuelTypesRepository.findById(data.id);
        if (!fuelTypeExists) {
            throw new Error("Combustível não existe");
        }
        const updateFuelTypes = await this.fuelTypesRepository.update(data);
        return updateFuelTypes;
    }
}