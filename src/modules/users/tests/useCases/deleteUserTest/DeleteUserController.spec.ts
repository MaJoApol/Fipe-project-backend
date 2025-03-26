
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../../useCases/deleteUsers.ts/deleteUserUseCase";
import { DeleteUserController } from "../../../useCases/deleteUsers.ts/deleteUserController";


describe("Delete Model Controller", () => {
    let deleteUserUseCaseMock: jest.Mocked<DeleteUserUseCase>;
    let deleteUserControllerMock: DeleteUserController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        deleteUserUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<DeleteUserUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(deleteUserUseCaseMock);

        deleteUserControllerMock = new DeleteUserController();

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
        deleteUserUseCaseMock.execute.mockResolvedValue();
        await deleteUserControllerMock.handle(request as Request, response as Response);

        expect(deleteUserUseCaseMock.execute).toHaveBeenCalledWith(request.params?.id, request.headers?.authorization);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.json).toHaveBeenCalledWith({message: "Deletado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao deletar.";
        deleteUserUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await deleteUserControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})