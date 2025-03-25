import "reflect-metadata";
import { describe } from "node:test";
import { CreateFuelTypesDTO } from "../../../dtos/CreateFuelTypesDTO";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";
import { findTokenId } from "../../../../../utils/findTokenId";
import { FuelTypesRepository } from "../../../infra/prisma/repositories/FuelTypesRepository";
import { CreateFuelTypeUseCase } from "../../../useCases/createFuelTypes/CreateFuelTypesUseCase";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Create Fuel Types Use Case", () => {

    let createFuelTypesUseCase: CreateFuelTypeUseCase;
    let fuelTypesRepositoryMock: jest.Mocked<FuelTypesRepository>;

    beforeEach(() =>{
        fuelTypesRepositoryMock = {
            findExistingFuelType: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<FuelTypesRepository>;
    
        createFuelTypesUseCase = new CreateFuelTypeUseCase(fuelTypesRepositoryMock);
    })
    
    const mockedData: FuelTypesDTO = {
        name: "TesteName",
        id: "1",
        abbreviation: "tes",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        createdById: "valid-token",
        updatedById: null,
        deletedById: null
    }

    it("Deve criar uma nova marca com sucesso ✅", async () => {

        fuelTypesRepositoryMock.findExistingFuelType.mockResolvedValue([]);
        fuelTypesRepositoryMock.create.mockResolvedValue(mockedData);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: CreateFuelTypesDTO = {name: "create", abbreviation: "Tes"}
        const result = await createFuelTypesUseCase.execute(data, "valid-token")

        expect(result).toHaveProperty("id");
        expect(result.name).toBe("TesteName");
        expect(result.createdById).toBe("valid-token");
    })

    it("Não deve permitir a criação de marcas iguais ❌", async () => {
        fuelTypesRepositoryMock.findExistingFuelType.mockResolvedValue([mockedData]);
        const data: CreateFuelTypesDTO = {name: "create", abbreviation: "Tes"}

        await expect(createFuelTypesUseCase.execute(data, "valid-token")).rejects.toThrow("Combustível já existe");
        expect(fuelTypesRepositoryMock.create).not.toHaveBeenCalled();
    })

})

