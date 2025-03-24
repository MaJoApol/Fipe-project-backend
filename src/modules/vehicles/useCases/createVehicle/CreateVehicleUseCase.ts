import { inject, injectable } from "tsyringe";
import { findTokenId } from "../../../../utils/findTokenId";
import { VehicleDTO } from "../../dtos/VehicleDTO";
import { CreateVehicleDTO } from "../../dtos/CreateVehicleDTO";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";

@injectable()
export class CreateVehicleUseCase{
    constructor(
        @inject("VehiclesRepository")
        private vehiclesRepository: IVehiclesRepository
    ){}
    async execute(data: CreateVehicleDTO, tokenId: string): Promise<VehicleDTO>{
        const vehicleExists = await this.vehiclesRepository.findExistingVehicles(data);
        if (vehicleExists.length > 0){
            throw new Error("Veículo já existe!")
        }

        const creatorId = findTokenId(tokenId)
        data.createdById = creatorId;

        return await this.vehiclesRepository.create(data)
    }
}