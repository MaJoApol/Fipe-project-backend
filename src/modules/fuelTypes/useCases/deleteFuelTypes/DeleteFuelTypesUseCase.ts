import { inject, injectable } from "tsyringe";
import { IFuelTypesRepository } from "../../repositories/IFuelTypesRepository";
import { findTokenId } from "../../../../utils/findTokenId";

@injectable()
export class DeleteFuelTypesUseCase{
    constructor(
        @inject("FuelTypesRepository")
        private fuelTypesRepository: IFuelTypesRepository 
    ){}

    async execute(id: string, tokenId: string): Promise<void>{
        const fuelTypeExists= await this.fuelTypesRepository.findById(id);
        if (!fuelTypeExists) {
            throw new Error("Combustível não existe!");
        }

        const performedBy = findTokenId(tokenId)

        return await this.fuelTypesRepository.remove(id, performedBy);
    }
}