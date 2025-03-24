import { CreateVehicleDTO } from "../dtos/CreateVehicleDTO";
import { UpdateVehicleDTO } from "../dtos/UpdateVehicleDTO";
import { VehicleDTO } from "../dtos/VehicleDTO";

export interface IVehicleRepository{
    create(data: CreateVehicleDTO): Promise<VehicleDTO>
    update(data: UpdateVehicleDTO): Promise<VehicleDTO>
    delete(id: string): Promise<void>
    list(page: {page: number}): Promise<VehicleDTO[]>
    findExistingVehicle(id: string): Promise<VehicleDTO>
}