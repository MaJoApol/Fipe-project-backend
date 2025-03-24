import { inject, injectable } from "tsyringe";
import { findTokenId } from "../../../../utils/findTokenId";
import { UpdateVehicleDTO } from "../../dtos/UpdateVehicleDTO";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";

@injectable()
export class UpdateVehicleUseCase{
    constructor(
        @inject("VehiclesRepository")
        private vehiclesRepository: IVehiclesRepository
    ){}
    async execute(data: UpdateVehicleDTO, tokenId: string){
        const vehicleExists = await this.vehiclesRepository.findExistingVehicles(data);
        if(!vehicleExists){
            throw new Error("Veículo não existe!");
        }

        const performedBy = findTokenId(tokenId);
        data.updatedById = performedBy;

        return await this.vehiclesRepository.update(data)
    }
}