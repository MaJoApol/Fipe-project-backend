import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateFuelTypeUseCase } from "../../../useCases/updateFuelTypes/UpdateFuelTypesUseCase";
import { UpdateFuelTypeController } from "../../../useCases/updateFuelTypes/UpdateFuelTypesController";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";
import { UpdateFuelTypesDTO } from "../../../dtos/UpdateFuelTypesDTO";

describe("Update Fuel Types Controller", () => {
    let updateFuelTypeUseCaseMock: jest.Mocked<UpdateFuelTypeUseCase>;
    let updateFuelTypeControllerMock: UpdateFuelTypeController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        updateFuelTypeUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<UpdateFuelTypeUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(updateFuelTypeUseCaseMock);

        updateFuelTypeControllerMock = new UpdateFuelTypeController();

        request = {
            body: {name: "Teste", abbreviation: "tes"},
            headers: { authorization: "token123"},
            params: {id: "1"}
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as jest.Mocked<Response>;
    });

        const mockedData: FuelTypesDTO = {
            name: "Teste",
            id: "1",
            abbreviation: "tes",
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date(),
            createdById: null,
            updatedById: "token123",
            deletedById: null
        }
    

    it("Deve chamar o Use Case e retornar 200", async () => {
        updateFuelTypeUseCaseMock.execute.mockResolvedValue(mockedData);
        await updateFuelTypeControllerMock.handle(request as Request, response as Response);
        const data: UpdateFuelTypesDTO = {name: "Teste", id: "1", abbreviation: "tes"} 

        expect(updateFuelTypeUseCaseMock.execute).toHaveBeenCalledWith(data, "token123");
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Atualizado com sucesso!", data})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao atualizar!";
        updateFuelTypeUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await updateFuelTypeControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})