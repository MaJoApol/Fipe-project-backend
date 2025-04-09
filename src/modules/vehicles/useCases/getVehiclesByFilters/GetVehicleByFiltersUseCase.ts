
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
        if (filters.fuelTypeIdFilter) filterBy.fuelTypeIdFilter = filters.fuelTypeIdFilter
        if (filters.vehicleYearFilter) filterBy.vehicleYearFilter = filters.vehicleYearFilter
        if (filters.referenceMonthFilter) filterBy.referenceMonthFilter = Number(filters.referenceMonthFilter)
        if (filters.referenceYearFilter) filterBy.referenceYearFilter = Number(filters.referenceYearFilter)

        const vehicles = await this.vehiclesRepository.findVehiclesByFilters(modelId, filterBy)
       
        return modelId ? vehicles : []

    }
}