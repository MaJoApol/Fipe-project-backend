import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserController } from "../../../useCases/createUser.ts/CreateUserController";
import { UsersDTO } from "../../../dtos/UsersDTO";
import { CreateUserUseCase } from "../../../useCases/createUser.ts/CreateUserUseCase";

describe("Create User Controller", () => {
    let createUserUseCase: jest.Mocked<CreateUserUseCase>;
    let createUserController: CreateUserController;
    let request: Request;
    let response: Response;

    beforeEach(()=>{
        createUserUseCase = {
            execute: jest.fn()
        } as unknown as jest.Mocked<CreateUserUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(createUserUseCase);

        createUserController = new CreateUserController();

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"}
        } as jest.Mocked<Request>;

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as jest.Mocked<Response>;
    });

        const mockedData: UsersDTO = {
            name: "TesteName",
            id: "1",
            token: "1",
            nationalId: "1234",
            email: "@",
            password: "213",
            contact: null,
            birthdate: null,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
            createdById: "valid-token",
            updatedById: null,
            deletedById: null
        }
    

    it("Deve chamar o Use Case e retornar 201", async () => {
        createUserUseCase.execute.mockResolvedValue(mockedData);
        await createUserController.handle(request, response);

        expect(createUserUseCase.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({message: "Criado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao criar user.";
        createUserUseCase.execute.mockRejectedValue(new Error(errorMessage));

        await createUserController.handle(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})


