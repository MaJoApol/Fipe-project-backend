
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateVehicleUseCase } from "../../../useCases/updateVehicle/UpdateVehicleUseCase";
import { UpdateVehicleController } from "../../../useCases/updateVehicle/UpdateVehicleController";
import { VehicleDTO } from "../../../dtos/VehicleDTO";
import { UpdateVehicleDTO } from "../../../dtos/UpdateVehicleDTO";

describe("Update Vehicle Controller", () => {
    let updateVehicleUseCaseMock: jest.Mocked<UpdateVehicleUseCase>;
    let updateVehicleControllerMock: UpdateVehicleController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        updateVehicleUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<UpdateVehicleUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(updateVehicleUseCaseMock);

        updateVehicleControllerMock = new UpdateVehicleController();

        request = {
            body: {
                value: 45000.99,
                fuelTypeId: "2",
                referenceMonth: 3,
                referenceYear: 2025,
                vehicleYear: 2022,
                modelId: "105"
            },
            headers: { authorization: "token123"},
            params: {id: "1"}
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

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

    it("Deve chamar o Use Case e retornar 200", async () => {
        updateVehicleUseCaseMock.execute.mockResolvedValue(mockedData);
        await updateVehicleControllerMock.handle(request as Request, response as Response);
        const data: UpdateVehicleDTO = {
            id: "1",
            value: 45000.99,
            fuelTypeId: "2",
            referenceMonth: 3,
            referenceYear: 2025,
            vehicleYear: 2022,
            modelId: "105"
        } 

        expect(updateVehicleUseCaseMock.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Atualizado com sucesso!", data})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao atualizar.";
        updateVehicleUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await updateVehicleControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})