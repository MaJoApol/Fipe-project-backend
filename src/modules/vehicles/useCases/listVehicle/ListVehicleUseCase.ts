import { inject, injectable } from "tsyringe";
import { VehiclesRepository } from "../../infra/prisma/repository/VehiclesRepository";
import { VehicleDTO } from "../../dtos/VehicleDTO";

@injectable()
export class ListVehicleUseCase{
    constructor(
        @inject("VehiclesRepository")
        private vehiclesRepository: VehiclesRepository
    ){}
    async execute(): Promise<VehicleDTO[]>{
        return await this.vehiclesRepository.list({page: 1});
    }
}