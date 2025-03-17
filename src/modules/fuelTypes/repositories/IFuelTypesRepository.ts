import { CreateFuelTypesDTO } from "../dtos/CreateFuelTypesDTO";
import { FuelTypesDTO } from "../dtos/FuelTypesDTO"; 

export interface IFuelTypesRepository{
    create(data: CreateFuelTypesDTO): Promise<FuelTypesDTO>
}