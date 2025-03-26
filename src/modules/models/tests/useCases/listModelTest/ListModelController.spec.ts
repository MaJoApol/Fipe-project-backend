
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ModelDTO } from "../../../dtos/ModelDTO";
import { ListModelUseCase } from "../../../useCases/listModel/ListModelUseCase";
import { ListModelController } from "../../../useCases/listModel/ListModelController";

describe("List Model Controller", () => {
    let listModelUseCaseMock: jest.Mocked<ListModelUseCase>;
    let listModelControllerMock: ListModelController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        listModelUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<ListModelUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(listModelUseCaseMock);

        listModelControllerMock = new ListModelController();

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
        var mockedData: ModelDTO[] = []
        for (var i = 0; i < pageNumber; i++){
            mockedData.push(
                {
                    id: `model-${i + 1}`,
                    name: `Model ${i + 1}`,
                    brandId: `Brand Id ${i + 1}`,
                    fipeCode: null,
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

        listModelUseCaseMock.execute.mockResolvedValue(mockBrands);

        await listModelControllerMock.handle(
            request as Request,
            response as Response
        )

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Listado com sucesso!", models: mockBrands})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao listar.";
        listModelUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await listModelControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})