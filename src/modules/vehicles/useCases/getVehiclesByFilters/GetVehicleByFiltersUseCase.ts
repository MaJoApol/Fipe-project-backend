
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

    async execute(modelId: string, filters: FilterDTO): Promise<VehicleDTO[]>{
        const filterBy: FilterDTO = {}
        console.log(filters)

       

        if (filters.fuelTypeFilter) filterBy.fuelTypeFilter = filters.fuelTypeFilter
        if (filters.vehicleYearFilter) filterBy.vehicleYearFilter = filters.vehicleYearFilter
        if (filters.referenceMonth) filterBy.referenceMonth = filters.referenceMonth
        if (filters.referenceYear) filterBy.referenceYear = filters.referenceYear

        console.log(filterBy)

        const vehicles = await this.vehiclesRepository.findVehiclesByFilters(modelId, filterBy)
        return modelId ? vehicles : []

    }
}