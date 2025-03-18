import { inject, injectable } from "tsyringe";
import { IFuelTypesRepository } from "../../repositories/IFuelTypesRepository";

@injectable()
export class DeleteFuelTypesUseCase{
    constructor(
        @inject("FuelTypesRepository")
        private fuelTypesRepository: IFuelTypesRepository 
    ){}

    async execute(id: string): Promise<void>{
        const fuelTypeExists= await this.fuelTypesRepository.findById(id);
        if (!fuelTypeExists) {
            throw new Error("Combustível não existe");
        }

        return await this.fuelTypesRepository.remove(id);
    }
}