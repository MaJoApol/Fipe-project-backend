
export interface FilterDTO {
    vehicleYearFilter?: number,
    fuelTypeIdFilter?: string
    referenceMonthFilter?: number
    referenceYearFilter?: number
}

export interface FilterWhereDTO {
    vehicleYear?: number,
    fuelTypeId?: string
    referenceMonth?: number
    referenceYear?: number
}