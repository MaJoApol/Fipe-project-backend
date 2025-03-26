
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../../useCases/updateUsers.ts/UpdateUserUseCase";
import { UpdateUserController } from "../../../useCases/updateUsers.ts/UpdateUserController";
import { UsersDTO } from "../../../dtos/UsersDTO";
import { UpdateUserDTO } from "../../../dtos/UpdateUserDTO";

describe("Update Brands Controller", () => {
    let updateUserUseCaseMock: jest.Mocked<UpdateUserUseCase>;
    let updateUserControllerMock: UpdateUserController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        updateUserUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<UpdateUserUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(updateUserUseCaseMock);

        updateUserControllerMock = new UpdateUserController();

        request = {
            body:
            { 
                name: "Maria Joana",
                nationalId: "111.111.111-11",
                email: "mariajoana@gmail.com",
                password: "joana123",
                birthdate: null,
                contact: null
            },
            headers: { authorization: "token123"},
            params: {id: "1"}
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

        const mockedData: UsersDTO = {
            name: "Maria Joana",
            id: "1",
            token: "valid-token",
            nationalId: "111.111.111-11",
            email: "mariajoana@gmail.com",
            password: "joana123",
            contact: null,
            birthdate: null,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            createdById: null,
            updatedById: "1",
            deletedById: null
        }

    it("Deve chamar o Use Case e retornar 200", async () => {
        updateUserUseCaseMock.execute.mockResolvedValue(mockedData);
        
        await updateUserControllerMock.handle(request as Request, response as Response);
        
        const data: UpdateUserDTO = {
            id: "1",
            name: "Maria Joana",
            nationalId: "111.111.111-11",
            email: "mariajoana@gmail.com",
            password: "joana123",
            birthdate: null,
            contact: null
        };

        expect(updateUserUseCaseMock.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Atualizado com sucesso!", data})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao atualizar.";
        updateUserUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await updateUserControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})