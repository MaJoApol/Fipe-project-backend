import { inject, injectable } from "tsyringe";
import { findTokenId } from "../../../../utils/findTokenId";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";

@injectable()
export class DeleteVehicleUseCase{
    constructor(
        @inject("VehiclesRepository")
        private vehiclesRepository: IVehiclesRepository
    ){}
    async execute(id: string, tokenId: string){
        const vehicleExists =  await this.vehiclesRepository.findById(id);
        if(vehicleExists === null){
            throw new Error("Veículo não existe!")
        }

       const performedBy = findTokenId(tokenId);
       
       return await this.vehiclesRepository.remove(id, performedBy)
    }
}