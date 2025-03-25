import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";
import { UpdateFuelTypeUseCase } from "../../../useCases/updateFuelTypes/UpdateFuelTypesUseCase";
import { FuelTypesRepository } from "../../../infra/prisma/repositories/FuelTypesRepository";
import { UpdateFuelTypesDTO } from "../../../dtos/UpdateFuelTypesDTO";


jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Update Fuel Types Use Case", () => {

    let updateFuelTypeUseCase: UpdateFuelTypeUseCase;
    let fuelTypesRepositoryMock: jest.Mocked<FuelTypesRepository>;

    beforeEach(() =>{
        fuelTypesRepositoryMock = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<FuelTypesRepository>;
    
        updateFuelTypeUseCase = new UpdateFuelTypeUseCase(fuelTypesRepositoryMock);
    })
    
    const mockedData: FuelTypesDTO = {
        name: "TesteName",
        id: "1",
        abbreviation: "tes",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: "valid-token",
        updatedById: null,
        deletedById: null
    }

    const mockedDataUpdate: FuelTypesDTO = {
        name: "Nome Diferente",
        id: "1",
        abbreviation: "tes",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdById: "valid-token",
        updatedById: "id de quem deu update",
        deletedById: null
    }


    it("Deve atualizar uma nova marca com sucesso ✅", async () => {

        fuelTypesRepositoryMock.findById.mockResolvedValue(mockedData);
        fuelTypesRepositoryMock.update.mockResolvedValue(mockedDataUpdate);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: UpdateFuelTypesDTO = { name: "TesteName", id: "1", abbreviation: "tes"}
        const result = await updateFuelTypeUseCase.execute(data, "valid-token")

        expect(fuelTypesRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(fuelTypesRepositoryMock.update).toHaveBeenCalledWith(data);
        expect(result).toEqual(mockedDataUpdate);
    })

    it("Não deve permitir atualizar onde não há marcas ❌", async () => {

        fuelTypesRepositoryMock.findById.mockResolvedValue(null);
        const data: UpdateFuelTypesDTO = { name: "TesteName", id: "1", abbreviation: "tes"}

        await expect(updateFuelTypeUseCase.execute(data, "valid-token")).rejects.toThrow("Combustível não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(fuelTypesRepositoryMock.update).not.toHaveBeenCalled();
    })

})