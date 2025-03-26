import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListFuelTypesUseCase } from "../../../useCases/listFuelTypes/listFuelTypesUseCase";
import { ListFuelTypesController } from "../../../useCases/listFuelTypes/listFuelTypesController";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";

describe("List Fuel Types Controller", () => {
    let listFuelTypesUseCaseMock: jest.Mocked<ListFuelTypesUseCase>;
    let listFuelTypeControllerMock: ListFuelTypesController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        listFuelTypesUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<ListFuelTypesUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(listFuelTypesUseCaseMock);

        listFuelTypeControllerMock = new ListFuelTypesController();

        request = {
            query: {
                page: 1,
                pageSize: 10
            } as any
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

    });

    function MockedData(pageNumber: number){
        var mockedData: FuelTypesDTO[] = []
        for (var i = 0; i < pageNumber; i++){
            mockedData.push(
                {
                    id: `fuelType-${i + 1}`,
                    name: `FuelType ${i + 1}`,
                    abbreviation: `Abbrev ${i + 1}`,
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

    it("Deve chamar o Use Case e retornar 200", async () => {
        const mockBrands = MockedData(10);
        listFuelTypesUseCaseMock.execute.mockResolvedValue(mockBrands);

        await listFuelTypeControllerMock.handle(
            request as Request,
            response as Response
        )

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Listado com sucesso!", fuelTypes: mockBrands})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao listar";
        listFuelTypesUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await listFuelTypeControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})