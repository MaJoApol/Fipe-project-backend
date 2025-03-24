import { VehicleDTO } from "./VehicleDTO";


export interface UpdateVehicleDTO extends Pick<VehicleDTO, "value" | "fuelTypeId" | "referenceMonth" | "referenceYear" | "vehicleYear" | "modelId">{
    updatedById?: string;
    updatedAt?: Date;
}