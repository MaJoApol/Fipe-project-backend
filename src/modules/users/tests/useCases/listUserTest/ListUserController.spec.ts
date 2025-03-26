
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListUserUseCase } from "../../../useCases/listUser.ts/ListUserUseCase";
import { ListUserController } from "../../../useCases/listUser.ts/ListUserController";
import { UsersDTO } from "../../../dtos/UsersDTO";

describe("List Model Controller", () => {
    let listUserUseCaseMock: jest.Mocked<ListUserUseCase>;
    let listUserControllerMock: ListUserController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        listUserUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<ListUserUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(listUserUseCaseMock);

        listUserControllerMock = new ListUserController();

        request = {
            query: {
                page: 1,
                pageSize: 10
            } as any
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

    });

    function MockedData(pageNumber: number){
        var mockedData: UsersDTO[] = []
        for (var i = 0; i < pageNumber; i++){
            mockedData.push(
                {
                    id: `user-${i + 1}`,
                    token: "",
                    name: `User ${i + 1}`,
                    nationalId: `User cpf ${i + 1}`,
                    email: `User email ${i + 1}`,
                    password: `User email ${i + 1}`,
                    birthdate: null,
                    contact: null,
                    createdAt: new Date(),
                    updatedAt: null,
                    isDeleted: false,
                    deletedAt: null,
                    createdById: "usuario-id",
                    updatedById: null,
                    deletedById: null,
                }
            )
        }
        return mockedData
    } 

    it("Deve chamar o Use Case e retornar 200", async () => {
        const mockBrands = MockedData(10);

        listUserUseCaseMock.execute.mockResolvedValue(mockBrands);

        await listUserControllerMock.handle(
            request as Request,
            response as Response
        )

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Listado com sucesso!", listResponse: mockBrands})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao listar.";
        listUserUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await listUserControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})