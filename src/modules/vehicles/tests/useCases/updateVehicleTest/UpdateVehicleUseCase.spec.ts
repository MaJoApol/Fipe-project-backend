import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { UpdateVehicleUseCase } from "../../../useCases/updateVehicle/UpdateVehicleUseCase";
import { VehiclesRepository } from "../../../infra/prisma/repository/VehiclesRepository";
import { VehicleDTO } from "../../../dtos/VehicleDTO";
import { UpdateVehicleDTO } from "../../../dtos/UpdateVehicleDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Update Vehicle Use Case", () => {

    let updateVehicleUseCase: UpdateVehicleUseCase;
    let vehicleRepositoryMock: jest.Mocked<VehiclesRepository>;

    beforeEach(() =>{
        vehicleRepositoryMock = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<VehiclesRepository>;
    
        updateVehicleUseCase = new UpdateVehicleUseCase(vehicleRepositoryMock);
    })
    
    const mockedData: VehicleDTO = {
        value: 120000,
        fuelTypeId: "1",
        referenceMonth: 12,
        referenceYear: 2012,
        vehicleYear: 2010,
        modelId: "1",
        id: "1",
        fipeCode: "123",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: "valid-token",
        updatedById: null,
        deletedById: null
    }

    const mockedDataUpdate: VehicleDTO = {
        value: 300000,
        fuelTypeId: "1",
        referenceMonth: 12,
        referenceYear: 2012,
        vehicleYear: 2010,
        modelId: "1",
        id: "1",
        fipeCode: "123",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: "valid-token",
        updatedById: null,
        deletedById: null
    }


    it("Deve atualizar uma nova marca com sucesso ✅", async () => {

        vehicleRepositoryMock.findById.mockResolvedValue(mockedData);
        vehicleRepositoryMock.update.mockResolvedValue(mockedDataUpdate);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: UpdateVehicleDTO = {
            id: "1",
            value: 45000.99,
            fuelTypeId: "2",
            referenceMonth: 3,
            referenceYear: 2025,
            vehicleYear: 2022,
            modelId: "105"
        }
        const result = await updateVehicleUseCase.execute(data, "valid-token")

        expect(vehicleRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(vehicleRepositoryMock.update).toHaveBeenCalledWith(data);
        expect(result).toEqual(mockedDataUpdate);
    })

    it("Não deve permitir atualizar onde não há marcas ❌", async () => {

        vehicleRepositoryMock.findById.mockResolvedValue(null);
        const data: UpdateVehicleDTO = {
            id: "1",
            value: 45000.99,
            fuelTypeId: "2",
            referenceMonth: 3,
            referenceYear: 2025,
            vehicleYear: 2022,
            modelId: "105"
        }

        await expect(updateVehicleUseCase.execute(data, "valid-token")).rejects.toThrow("Veículo não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(vehicleRepositoryMock.update).not.toHaveBeenCalled();
    })

})