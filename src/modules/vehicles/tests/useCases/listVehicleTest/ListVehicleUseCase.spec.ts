import "reflect-metadata";
import { describe } from "node:test";
import { ListVehicleUseCase } from "../../../useCases/listVehicle/ListVehicleUseCase";
import { VehiclesRepository } from "../../../infra/prisma/repository/VehiclesRepository";
import { VehicleDTO } from "../../../dtos/VehicleDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("List Brand Use Case", () => {

    let listVehicleUseCase: ListVehicleUseCase;
    let vehiclesRepositoryMock: jest.Mocked<VehiclesRepository>;

    beforeEach(() =>{
        vehiclesRepositoryMock = {
            list: jest.fn(),
        } as unknown as jest.Mocked<VehiclesRepository>;
    
        listVehicleUseCase = new ListVehicleUseCase(vehiclesRepositoryMock);
    })

    
    function MockedData(pageNumber: number){
        var mockedData: VehicleDTO[] = []
        for (var i = 0; i < pageNumber; i++){
            mockedData.push(
                {
                    id: `vehicle-${i + 1}`,
                    fipeCode: null,
                    createdAt: new Date(),
                    updatedAt: null,
                    isDeleted: false,
                    deletedAt: null,
                    createdById: "usuario-id",
                    updatedById: null,
                    deletedById: null,
                    value: 120000,
                    fuelTypeId: `Vehicle Id ${i + 1}`,
                    referenceMonth: 12,
                    referenceYear: 2012,
                    vehicleYear: 2010,
                    modelId: "1",
                }
            )
        }
        return mockedData
    } 

    it("Deve criar mostrar os dados sucesso ✅", async () => {
        const mockedData = MockedData(10);
        vehiclesRepositoryMock.list.mockResolvedValue(mockedData);
        const page = 1;
        const pageSize = 10;
        const result = await listVehicleUseCase.execute(page, pageSize);

        expect(vehiclesRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual(mockedData);
        expect(result.length).toBe(pageSize);
    })

    it("Deve retornar uma lista vazia caso não haja marcas ❌", async () => {
        vehiclesRepositoryMock.list.mockResolvedValue([]);

        const page = 1;
        const pageSize = 10;
        const result = await listVehicleUseCase.execute(page, pageSize);
        expect(vehiclesRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        
        expect(result).toEqual([]);
    })

})