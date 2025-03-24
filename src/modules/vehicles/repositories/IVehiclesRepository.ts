import { CreateVehicleDTO } from "../dtos/CreateVehicleDTO";
import { UpdateVehicleDTO } from "../dtos/UpdateVehicleDTO";
import { VehicleDTO } from "../dtos/VehicleDTO";

export interface IVehiclesRepository{
    create(data: CreateVehicleDTO): Promise<VehicleDTO>;
    update(data: UpdateVehicleDTO): Promise<VehicleDTO>;
    remove(id: string, performer: string): Promise<void>;
    list(page: {page: number}): Promise<VehicleDTO[]>;
    findExistingVehicles(data: CreateVehicleDTO): Promise<VehicleDTO[]>;
    findById(id: string): Promise<VehicleDTO>;
}