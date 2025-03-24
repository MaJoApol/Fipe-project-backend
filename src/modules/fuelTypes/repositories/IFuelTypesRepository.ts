import { CreateFuelTypesDTO } from "../dtos/CreateFuelTypesDTO";
import { FuelTypesDTO } from "../dtos/FuelTypesDTO";
import { UpdateFuelTypesDTO } from "../dtos/UpdateFuelTypesDTO";


export interface IFuelTypesRepository{
    create(data: CreateFuelTypesDTO): Promise<FuelTypesDTO>;
    remove(id: string, performer: string): Promise<void>;
    update(data: UpdateFuelTypesDTO): Promise<FuelTypesDTO>;
    findById(id: string): Promise<FuelTypesDTO>;
    findExistingFuelType(data: CreateFuelTypesDTO): Promise<FuelTypesDTO[]>;
    list(data: {page: number}): Promise<FuelTypesDTO[]>;
}


