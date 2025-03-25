import "reflect-metadata";
import { describe } from "node:test";
import { ListFuelTypesUseCase } from "../../../useCases/listFuelTypes/listFuelTypesUseCase";
import { FuelTypesRepository } from "../../../infra/prisma/repositories/FuelTypesRepository";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("List Brand Use Case", () => {

    let listFuelTypeUseCase: ListFuelTypesUseCase;
    let fuelTypesRepositoryMock: jest.Mocked<FuelTypesRepository>;

    beforeEach(() =>{
        fuelTypesRepositoryMock = {
            list: jest.fn(),
        } as unknown as jest.Mocked<FuelTypesRepository>;
    
        listFuelTypeUseCase = new ListFuelTypesUseCase(fuelTypesRepositoryMock);
    })

    
    function MockedData(pageNumber: number){
        var mockedData: FuelTypesDTO[] = []
        for (var i = 0; i < pageNumber; i++){
            mockedData.push(
                {
                    id: `brand-${i + 1}`,
                    name: `Brand ${i + 1}`,
                    abbreviation: `abbrev ${i + 1}`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isDeleted: false,
                    deletedAt: null,
                    createdById: "usuario-id",
                    updatedById: null,
                    deletedById: null,
                }
            )
        }
        return mockedData
    } 

    it("Deve criar mostrar os dados sucesso ✅", async () => {
        const mockedData = MockedData(5);
        fuelTypesRepositoryMock.list.mockResolvedValue(mockedData);
        const page = 1;
        const pageSize = 5;
        const result = await listFuelTypeUseCase.execute(page, pageSize);

        expect(fuelTypesRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual(mockedData);
        expect(result.length).toBe(pageSize);
    })

    it("Deve retornar uma lista vazia caso não haja marcas ❌", async () => {
        fuelTypesRepositoryMock.list.mockResolvedValue([]);

        const page = 1;
        const pageSize = 5;
        const result = await listFuelTypeUseCase.execute(page, pageSize);
        expect(fuelTypesRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual([]);
    })

})