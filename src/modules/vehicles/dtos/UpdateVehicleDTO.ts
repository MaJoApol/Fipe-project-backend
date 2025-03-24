import { VehicleDTO } from "./VehicleDTO";


export interface UpdateVehicleDTO extends Pick<VehicleDTO, "id" | "value" | "fuelTypeId" | "referenceMonth" | "referenceYear" | "vehicleYear" | "modelId">{
    updatedById?: string;
    updatedAt?: Date;
}