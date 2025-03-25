
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteFuelTypesUseCase } from "../../../useCases/deleteFuelTypes/DeleteFuelTypesUseCase";
import { DeleteFuelTypesController } from "../../../useCases/deleteFuelTypes/DeleteFuelTypesController";
import { FuelTypesDTO } from "../../../dtos/FuelTypesDTO";
import { UpdateFuelTypesDTO } from "../../../dtos/UpdateFuelTypesDTO";



describe("Delete Fuel Type Controller", () => {
    let deleteFuelTypeUseCaseMock: jest.Mocked<DeleteFuelTypesUseCase>;
    let deleteFuelTypesControllerMock: DeleteFuelTypesController;
    let request: Partial<Request>;
    let response: Response;

    beforeEach(()=>{
        deleteFuelTypeUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<DeleteFuelTypesUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(deleteFuelTypeUseCaseMock);

        deleteFuelTypesControllerMock = new DeleteFuelTypesController();

        request = {
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
            updatedById: null,
            deletedById: "token123"
        }
    

    it("Deve chamar o Use Case e retornar 200", async () => {
        deleteFuelTypeUseCaseMock.execute.mockResolvedValue();
        await deleteFuelTypesControllerMock.handle(request as Request, response);
        const data: UpdateFuelTypesDTO = {name: "Teste", id: "1"} 

        expect(deleteFuelTypeUseCaseMock.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Atualizado com sucesso!", data})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao atualizar";
        deleteFuelTypeUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await deleteFuelTypesControllerMock.handle(request as Request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})