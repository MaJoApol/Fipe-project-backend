
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateModelUseCase } from "../../../useCases/updateModel/UpdateModelUseCase";
import { UpdateModelController } from "../../../useCases/updateModel/UpdateModelController";
import { ModelDTO } from "../../../dtos/ModelDTO";
import { UpdateModelDTO } from "../../../dtos/UpdateModelDTO";

describe("Update Brands Controller", () => {
    let updateModelUseCaseMock: jest.Mocked<UpdateModelUseCase>;
    let updateModelControllerMock: UpdateModelController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        updateModelUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<UpdateModelUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(updateModelUseCaseMock);

        updateModelControllerMock = new UpdateModelController();

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"},
            params: {id: "1"}
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

        const mockedData: ModelDTO = {
            name: "Teste",
            id: "1",
            brandId: "1",
            fipeCode: null,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date(),
            createdById: null,
            updatedById: "token123",
            deletedById: null
        }

    it("Deve chamar o Use Case e retornar 200", async () => {
        updateModelUseCaseMock.execute.mockResolvedValue(mockedData);
        await updateModelControllerMock.handle(request as Request, response as Response);
        const data: UpdateModelDTO = {name: "Teste", id: "1"} 

        expect(updateModelUseCaseMock.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Atualizado com sucesso!", data})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao atualizar.";
        updateModelUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await updateModelControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})