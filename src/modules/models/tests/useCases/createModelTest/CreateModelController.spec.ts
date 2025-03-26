
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateModelUseCase } from "../../../useCases/createModel/CreateModelUseCase";
import { CreateModelController } from "../../../useCases/createModel/CreateModelController";
import { ModelDTO } from "../../../dtos/ModelDTO";

describe("Create Model Controller", () => {
    let createModelUseCase: jest.Mocked<CreateModelUseCase>;
    let createModelController: CreateModelController;
    let request: Request;
    let response: Response;

    beforeEach(()=>{
        createModelUseCase = {
            execute: jest.fn()
        } as unknown as jest.Mocked<CreateModelUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(createModelUseCase);

        createModelController = new CreateModelController();

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"}
        } as jest.Mocked<Request>;

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as jest.Mocked<Response>;
    });

        const mockedData: ModelDTO = {
            name: "TesteName",
            id: "1",
            brandId: "1",
            fipeCode: null,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
            createdById: "valid-token",
            updatedById: null,
            deletedById: null
        }
    

    it("Deve chamar o Use Case e retornar 201", async () => {
        createModelUseCase.execute.mockResolvedValue(mockedData);
        await createModelController.handle(request, response);

        expect(createModelUseCase.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({message: "Criado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao criar modelo.";
        createModelUseCase.execute.mockRejectedValue(new Error(errorMessage));

        await createModelController.handle(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})


