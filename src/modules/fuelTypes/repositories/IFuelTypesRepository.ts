import { CreateFuelTypesDTO } from "../dtos/CreateFuelTypesDTO";
import { FuelTypesDTO } from "../dtos/FuelTypesDTO";
import { UpdateFuelTypesDTO } from "../dtos/UpdateFuelTypesDTO";


export interface IFuelTypesRepository{
    create(data: CreateFuelTypesDTO): Promise<FuelTypesDTO>;
    remove(id: string, performer: string): Promise<void>;
    update(data: UpdateFuelTypesDTO): Promise<FuelTypesDTO>;
    findById(id: string): Promise<FuelTypesDTO | null>;
    findExistingFuelType(data: CreateFuelTypesDTO): Promise<FuelTypesDTO[]>;
    list(page: number, pageSize: number): Promise<FuelTypesDTO[]>;
}


