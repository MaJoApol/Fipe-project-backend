import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";

import { VehicleDTO } from "../../../dtos/VehicleDTO";
import { CreateVehicleDTO } from "../../../dtos/CreateVehicleDTO";
import { CreateVehicleUseCase } from "../../../useCases/createVehicle/CreateVehicleUseCase";
import { VehiclesRepository } from "../../../infra/prisma/repository/VehiclesRepository";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Create Model Use Case", () => {

    let createVehicleUseCase: CreateVehicleUseCase;
    let vehiclesRepositoryMock: jest.Mocked<VehiclesRepository>;

    beforeEach(() =>{
        jest.clearAllMocks();
        vehiclesRepositoryMock = {
            findExistingVehicles: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<VehiclesRepository>;
    
        createVehicleUseCase = new CreateVehicleUseCase(vehiclesRepositoryMock);
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

    it("Deve criar uma nova marca com sucesso ✅", async () => {
        
        vehiclesRepositoryMock.findExistingVehicles.mockResolvedValue([]);
        vehiclesRepositoryMock.create.mockResolvedValue(mockedData);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: CreateVehicleDTO = {
            value: 45000.99,
            fuelTypeId: "2",
            referenceMonth: 3,
            referenceYear: 2025,
            vehicleYear: 2022,
            modelId: "105"
        }

        const result = await createVehicleUseCase.execute(data, "valid-token")

        expect(result).toHaveProperty("id");
        expect(result.value).toBe(120000);
        expect(result.createdById).toBe("valid-token");
    })

    it("Não deve permitir a criação de marcas iguais ❌", async () => {
        vehiclesRepositoryMock.findExistingVehicles.mockResolvedValue([mockedData]);
        
        const data: CreateVehicleDTO = {
            value: 45000.99,
            fuelTypeId: "2",
            referenceMonth: 3,
            referenceYear: 2025,
            vehicleYear: 2022,
            modelId: "105"}

        await expect(createVehicleUseCase.execute(data, "valid-token")).rejects.toThrow("Veículo já existe!");
        expect(vehiclesRepositoryMock.create).not.toHaveBeenCalled();
    })

})
