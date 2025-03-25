
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteFuelTypesUseCase } from "../../../useCases/deleteFuelTypes/DeleteFuelTypesUseCase";
import { DeleteFuelTypesController } from "../../../useCases/deleteFuelTypes/DeleteFuelTypesController";

describe("Delete Brands Controller", () => {
    let deleteFuelTypeUseCaseMock: jest.Mocked<DeleteFuelTypesUseCase>;
    let deleteFuelTypeControllerMock: DeleteFuelTypesController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        deleteFuelTypeUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<DeleteFuelTypesUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(deleteFuelTypeUseCaseMock);

        deleteFuelTypeControllerMock = new DeleteFuelTypesController();

        request = {
            headers: { authorization: "token123"},
            params: {id: "1"}
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    

    it("Deve chamar o Use Case e retornar 200", async () => {
        deleteFuelTypeUseCaseMock.execute.mockResolvedValue();
        await deleteFuelTypeControllerMock.handle(request as Request, response as Response);

        expect(deleteFuelTypeUseCaseMock.execute).toHaveBeenCalledWith(request.params?.id, request.headers?.authorization);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.json).toHaveBeenCalledWith({message: "Deletado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao deletar.";
        deleteFuelTypeUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await deleteFuelTypeControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})