
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { UpdateBrandDTO } from "../../../dtos/UpdateBrandDTO";
import { UpdateBrandController } from "../../../useCases/updateBrands/UpdateBrandController";
import { UpdateBrandUseCase } from "../../../useCases/updateBrands/UpdateBrandUseCase";

describe("Update Brands Controller", () => {
    let updateBrandUseCaseMock: jest.Mocked<UpdateBrandUseCase>;
    let updateBrandControllerMock: UpdateBrandController;
    let request: Partial<Request>;
    let response: Response;

    beforeEach(()=>{
        updateBrandUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<UpdateBrandUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(updateBrandUseCaseMock);

        updateBrandControllerMock = new UpdateBrandController();

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"},
            params: {id: "1"}
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as jest.Mocked<Response>;
    });

        const mockedData: BrandDTO = {
            name: "Teste",
            id: "1",
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
        updateBrandUseCaseMock.execute.mockResolvedValue(mockedData);
        await updateBrandControllerMock.handle(request as Request, response);
        const data: UpdateBrandDTO = {name: "Teste", id: "1"} 

        expect(updateBrandUseCaseMock.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({message: "Atualizado com sucesso!", data})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao atualizar";
        updateBrandUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await updateBrandControllerMock.handle(request as Request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})