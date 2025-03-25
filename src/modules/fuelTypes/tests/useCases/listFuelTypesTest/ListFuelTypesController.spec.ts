import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";

describe("List Brands Controller", () => {
    let listBrandUseCaseMock: jest.Mocked<ListBrandUseCase>;
    let listBrandControllerMock: ListBrandController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        listBrandUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<ListBrandUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(listBrandUseCaseMock);

        listBrandControllerMock = new ListBrandController();

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
        var mockedData: BrandDTO[] = []
        for (var i = 0; i < pageNumber; i++){
            mockedData.push(
                {
                    id: `brand-${i + 1}`,
                    name: `Brand ${i + 1}`,
                    fipeCode: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
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
        const mockBrands = MockedData(5);

        listBrandUseCaseMock.execute.mockResolvedValue(mockBrands);

        await listBrandControllerMock.handle(
            request as Request,
            response as Response
        )

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Listado com sucesso!", brands: mockBrands})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao listar";
        listBrandUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await listBrandControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})