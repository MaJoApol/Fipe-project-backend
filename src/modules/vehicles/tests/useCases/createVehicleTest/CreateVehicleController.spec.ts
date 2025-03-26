
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateVehicleUseCase } from "../../../useCases/createVehicle/CreateVehicleUseCase";
import { CreateVehicleController } from "../../../useCases/createVehicle/CreateVehicleController";
import { VehicleDTO } from "../../../dtos/VehicleDTO";

describe("Create Model Controller", () => {
    let createVehicleUseCase: jest.Mocked<CreateVehicleUseCase>;
    let createVehicleController: CreateVehicleController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        createVehicleUseCase = {
            execute: jest.fn()
        } as unknown as jest.Mocked<CreateVehicleUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(createVehicleUseCase);

        createVehicleController = new CreateVehicleController();

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"}
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
    

    it("Deve chamar o Use Case e retornar 201", async () => {
        createVehicleUseCase.execute.mockResolvedValue(mockedData);
        await createVehicleController.handle(request as Request, response as Response);

        expect(createVehicleUseCase.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({message: "Criado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao criar veículo.";
        createVehicleUseCase.execute.mockRejectedValue(new Error(errorMessage));

        await createVehicleController.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})


