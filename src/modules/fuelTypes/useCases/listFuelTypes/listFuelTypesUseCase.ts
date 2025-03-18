import { inject, injectable } from "tsyringe";
import { FuelTypesRepository } from "../../infra/prisma/repositories/FuelTypesRepository";
import { FuelTypesDTO } from "../../dtos/FuelTypesDTO";


@injectable()
export class ListFuelTypesUseCase{
    constructor(
        @inject("FuelTypesRepository")
        private fuelTypesRepository: FuelTypesRepository
    ){}
    async execute(): Promise<FuelTypesDTO[]>{
        const fuelTypes = await this.fuelTypesRepository.list({page: 1});
        return fuelTypes;
    }
}