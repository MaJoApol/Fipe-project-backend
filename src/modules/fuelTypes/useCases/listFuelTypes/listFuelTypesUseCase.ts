import { inject, injectable } from "tsyringe";
import { IFuelTypesRepository } from "../../repositories/IFuelTypesRepository";
import { FuelTypesDTO } from "../../dtos/FuelTypesDTO";


@injectable()
export class ListFuelTypesUseCase{
    constructor(
        @inject("FuelTypesRepository")
        private fuelTypesRepository: IFuelTypesRepository
    ){}
    async execute(page: number, pageSize: number): Promise<FuelTypesDTO[]>{
        const fuelTypes = await this.fuelTypesRepository.list(page= 1, pageSize= 10);
        return fuelTypes;
    }
}