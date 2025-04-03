
import { inject, injectable } from "tsyringe";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";
import { VehicleDTO } from "../../dtos/VehicleDTO";
import { FilterDTO } from "../../../fuelTypes/dtos/FilterDTO";

@injectable()
export class GetVehiclesByFiltersUseCase{
    constructor(
        @inject('VehiclesRepository')
        private vehiclesRepository : IVehiclesRepository
    ){}

    async execute(filters: FilterDTO): Promise<VehicleDTO[]>{
        const filterBy: FilterDTO = {
            modelId: filters.modelId
        }

        if (filters.fuelTypeId) filterBy.fuelTypeId = filters.fuelTypeId
        if (filters.vehicleYear) filterBy.vehicleYear = filters.vehicleYear
        if (filters.referenceMonth) filterBy.referenceMonth = filters.referenceMonth
        if (filters.referenceYear) filterBy.referenceYear = filters.referenceYear

        const vehicles = await this.vehiclesRepository.findVehiclesByFilters(filterBy)
        return filterBy.modelId ? vehicles : []

    }
}