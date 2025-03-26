
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListVehicleUseCase } from "../../../useCases/listVehicle/ListVehicleUseCase";
import { ListVehicleController } from "../../../useCases/listVehicle/ListVehicleController";
import { VehicleDTO } from "../../../dtos/VehicleDTO";

describe("List Vehicle Controller", () => {
    let listVehicleUseCaseMock: jest.Mocked<ListVehicleUseCase>;
    let listVehicleControllerMock: ListVehicleController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        listVehicleUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<ListVehicleUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(listVehicleUseCaseMock);

        listVehicleControllerMock = new ListVehicleController();

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

    it("Deve chamar o Use Case e retornar 200", async () => {
        const mockBrands = MockedData(10);

        listVehicleUseCaseMock.execute.mockResolvedValue(mockBrands);

        await listVehicleControllerMock.handle(
            request as Request,
            response as Response
        )

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Listado com sucesso!", listResponse: mockBrands})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao listar.";
        listVehicleUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await listVehicleControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})