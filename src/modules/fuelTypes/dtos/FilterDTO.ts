
export interface FilterDTO {
    vehicleYearFilter?: number,
    fuelTypeFilter?: string
    referenceMonth?: number
    referenceYear?: number
}

export interface FilterWhereDTO {
    vehicleYear?: number,
    fuelTypeId?: string
    referenceMonth?: number
    referenceYear?: number
}