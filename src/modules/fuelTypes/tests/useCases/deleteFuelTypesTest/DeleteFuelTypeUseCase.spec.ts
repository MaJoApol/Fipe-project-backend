import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { DeleteFuelTypesUseCase } from "../../../useCases/deleteFuelTypes/DeleteFuelTypesUseCase";
import { FuelTypesRepository } from "../../../infra/prisma/repositories/FuelTypesRepository";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";


jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Delete Fuel Type Use Case", () => {

    let deleteFuelTypeUseCase: DeleteFuelTypesUseCase;
    let fuelTypesRepositoryMock: jest.Mocked<FuelTypesRepository>;

    beforeEach(() =>{
        fuelTypesRepositoryMock = {
            findById: jest.fn(),
            remove: jest.fn(),
        } as unknown as jest.Mocked<FuelTypesRepository>;
    
        deleteFuelTypeUseCase = new DeleteFuelTypesUseCase(fuelTypesRepositoryMock);
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


    it("Deve deleter uma combustível com sucesso ✅", async () => {

        fuelTypesRepositoryMock.findById.mockResolvedValue(mockedData);
        fuelTypesRepositoryMock.remove.mockResolvedValue();
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const id: string = "1"
        const result = await deleteFuelTypeUseCase.execute(id, "valid-token")

        expect(fuelTypesRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(fuelTypesRepositoryMock.remove).toHaveBeenCalledWith(id, "valid-token");
        expect(result).toEqual(undefined);
    })

    it("Não deve permitir deletar onde não há combustível ❌", async () => {

        fuelTypesRepositoryMock.findById.mockResolvedValue(null);
        const id: string = "1"

        await expect(deleteFuelTypeUseCase.execute(id, "valid-token")).rejects.toThrow("Combustível não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(fuelTypesRepositoryMock.remove).not.toHaveBeenCalled();
    })

})