
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteModelUseCase } from "../../../useCases/deleteModel/DeleteModelUseCase";
import { DeleteModelController } from "../../../useCases/deleteModel/DeleteModelController";

describe("Delete Model Controller", () => {
    let deleteModelUseCaseMock: jest.Mocked<DeleteModelUseCase>;
    let deleteModelControllerMock: DeleteModelController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        deleteModelUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<DeleteModelUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(deleteModelUseCaseMock);

        deleteModelControllerMock = new DeleteModelController();

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
        deleteModelUseCaseMock.execute.mockResolvedValue();
        await deleteModelControllerMock.handle(request as Request, response as Response);

        expect(deleteModelUseCaseMock.execute).toHaveBeenCalledWith(request.params?.id, request.headers?.authorization);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.json).toHaveBeenCalledWith({message: "Deletado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao deletar.";
        deleteModelUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await deleteModelControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})