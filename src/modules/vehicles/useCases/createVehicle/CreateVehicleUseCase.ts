import { inject, injectable } from "tsyringe";
import { findTokenId } from "../../../../utils/findTokenId";
import { VehicleDTO } from "../../dtos/VehicleDTO";
import { CreateVehicleDTO } from "../../dtos/CreateVehicleDTO";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";
import { IModelsRepository } from "../../../models/repositories/IModelsRepository";
import { IFuelTypesRepository } from "../../../fuelTypes/repositories/IFuelTypesRepository";

@injectable()
export class CreateVehicleUseCase{
    constructor(
        @inject("VehiclesRepository")
        private vehiclesRepository: IVehiclesRepository,
        @inject("ModelsRepository")
        private modelsRepository: IModelsRepository,
        @inject("FuelTypesRepository")
        private fuelTypesRepository: IFuelTypesRepository
    ){}
    async execute(data: CreateVehicleDTO, tokenId: string): Promise<VehicleDTO>{

        const vehicleExists = await this.vehiclesRepository.findExistingVehicles(data);
        if (vehicleExists.length > 0){
            throw new Error("Veículo já existe!")
        }

        const modelExists =  await this.modelsRepository.findById(data.modelId);
        const fuelTypesExists =  await this.fuelTypesRepository.findById(data.fuelTypeId);
        if(modelExists === null){
            throw new Error("Modelo não existe!")
        }

        if(fuelTypesExists === null){
            throw new Error("Combustível não existe!")
        }

        const creatorId = findTokenId(tokenId)
        data.createdById = creatorId;

        return await this.vehiclesRepository.create(data)
    }
}