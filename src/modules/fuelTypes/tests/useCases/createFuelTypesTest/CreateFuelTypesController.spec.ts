
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";

import { Request, Response } from "express";

import { CreateFuelTypeController } from "../../../useCases/createFuelTypes/CreateFuelTypesController";
import { CreateFuelTypeUseCase } from "../../../useCases/createFuelTypes/CreateFuelTypesUseCase";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";

describe("Create Fuel Type Controller", () => {
    let createFuelTypeUseCaseMock: jest.Mocked<CreateFuelTypeUseCase>;
    let createFuelTypesController: CreateFuelTypeController;
    let request: Request;
    let response: Response;

    beforeEach(()=>{
        createFuelTypeUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<CreateFuelTypeUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(createFuelTypeUseCaseMock);

        createFuelTypesController = new CreateFuelTypeController();

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"}
        } as jest.Mocked<Request>;

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as jest.Mocked<Response>;
    });

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
    

    it("Deve chamar o Use Case e retornar 201", async () => {
        createFuelTypeUseCaseMock.execute.mockResolvedValue(mockedData);
        await createFuelTypesController.handle(request, response);

        expect(createFuelTypeUseCaseMock.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({message: "Criado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao criar a combustível";
        createFuelTypeUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await createFuelTypesController.handle(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})
