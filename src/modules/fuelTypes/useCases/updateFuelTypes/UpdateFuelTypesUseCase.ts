import { inject, injectable } from "tsyringe";
import { FuelTypesRepository } from "../../infra/prisma/repositories/FuelTypesRepository";
import { UpdateFuelTypesDTO } from "../../dtos/UpdateFuelTypesDTO";
import { FuelTypesDTO } from "../../dtos/FuelTypesDTO";
import { findTokenId } from "../../../../utils/findTokenId";


@injectable()
export class UpdateFuelTypeUseCase{
    constructor(
        @inject("FuelTypesRepository")
        private fuelTypesRepository: FuelTypesRepository
    ){}

    async execute(data: UpdateFuelTypesDTO, tokenId: string): Promise<FuelTypesDTO>{
        const fuelTypeExists= await this.fuelTypesRepository.findById(data.id);
        if (!fuelTypeExists) {
            throw new Error("Combustível não existe!");
        }

        const performedBy = findTokenId(tokenId);
        data.updatedById = performedBy

        const updateFuelTypes = await this.fuelTypesRepository.update(data);
        return updateFuelTypes;
    }
}