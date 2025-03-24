import { VehicleDTO } from "./VehicleDTO";

export interface CreateVehicleDTO extends Pick<VehicleDTO, "value" | "fuelTypeId" | "referenceMonth" | "referenceYear" | "vehicleYear" | "modelId">{
    createdById?: string;
}