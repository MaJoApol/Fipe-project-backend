
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { CreateBrandUseCase } from "../../../useCases/createBrands/CreateBrandUseCase";
import { Request } from "express";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { CreateBrandController } from "../../../useCases/createBrands/CreateBrandController";

describe("Create Brands Controller", () => {
    let createBrandUseCaseMock: jest.Mocked<CreateBrandUseCase>;
    let createBrandController: CreateBrandController;
    let request: Request;
    let response: Response;

    beforeEach(()=>{
        createBrandUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<CreateBrandUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(createBrandUseCaseMock);

        createBrandController = new CreateBrandController();

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"}
        } as jest.Mocked<Request>;

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as jest.Mocked<Response>;
    });

        const mockedData: BrandDTO = {
            name: "TesteName",
            id: "1",
            fipeCode: null,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date(),
            createdById: "valid-token",
            updatedById: null,
            deletedById: null
        }
    

    it("Deve chamar o Use Case e retornar 201", async () => {
        createBrandUseCaseMock.execute.mockResolvedValue(mockedData);
        await createBrandController.handle(request, response);

        expect(createBrandUseCaseMock.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({message: "Criado com sucesso!"})
    })

})