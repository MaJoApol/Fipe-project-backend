import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { CreateModelUseCase } from "../../../useCases/createModel/CreateModelUseCase";
import { ModelsRepository } from "../../../infra/prisma/repositories/ModelsRepository";
import { ModelDTO } from "../../../dtos/ModelDTO";
import { CreateModelDTO } from "../../../dtos/CreateModelDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Create Model Use Case", () => {

    let createModelUseCase: CreateModelUseCase;
    let modelsRepositoryMock: jest.Mocked<ModelsRepository>;

    beforeEach(() =>{
        modelsRepositoryMock = {
            findExistingModels: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<ModelsRepository>;
    
        createModelUseCase = new CreateModelUseCase(modelsRepositoryMock);
    })

    const mockedData: ModelDTO = {
        name: "TesteName",
        id: "1",
        brandId: "1",
        fipeCode: "123",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: "valid-token",
        updatedById: null,
        deletedById: null
    }

    it("Deve criar uma nova marca com sucesso ✅", async () => {

        modelsRepositoryMock.findExistingModels.mockResolvedValue([]);
        modelsRepositoryMock.create.mockResolvedValue(mockedData);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: CreateModelDTO = {name: "teste", brandId: "1"}
        const result = await createModelUseCase.execute(data, "valid-token")

        expect(result).toHaveProperty("id");
        expect(result.name).toBe("TesteName");
        expect(result.createdById).toBe("valid-token");
    })

    it("Não deve permitir a criação de marcas iguais ❌", async () => {
        modelsRepositoryMock.findExistingModels.mockResolvedValue([mockedData]);
        const data: CreateModelDTO = {name: "teste", brandId: "1"}

        await expect(createModelUseCase.execute(data, "valid-token")).rejects.toThrow("Modelo já existe");
        expect(modelsRepositoryMock.create).not.toHaveBeenCalled();
    })

})
