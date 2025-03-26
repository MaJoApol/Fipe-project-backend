import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { UpdateModelUseCase } from "../../../useCases/updateModel/UpdateModelUseCase";
import { ModelsRepository } from "../../../infra/prisma/repositories/ModelsRepository";
import { ModelDTO } from "../../../dtos/ModelDTO";
import { UpdateModelDTO } from "../../../dtos/UpdateModelDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Update Model Use Case", () => {

    let updateModelUseCase: UpdateModelUseCase;
    let modelRepositoryMock: jest.Mocked<ModelsRepository>;

    beforeEach(() =>{
        modelRepositoryMock = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<ModelsRepository>;
    
        updateModelUseCase = new UpdateModelUseCase(modelRepositoryMock);
    })
    
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

    const mockedDataUpdate: ModelDTO = {
        name: "Nome Diferente",
        id: "1",
        brandId: "1",
        fipeCode: null,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdById: "valid-token",
        updatedById: "id de quem deu update",
        deletedById: null
    }


    it("Deve atualizar uma nova marca com sucesso ✅", async () => {

        modelRepositoryMock.findById.mockResolvedValue(mockedData);
        modelRepositoryMock.update.mockResolvedValue(mockedDataUpdate);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: UpdateModelDTO = { name: "TesteName", id: "1"}
        const result = await updateModelUseCase.execute(data, "valid-token")

        expect(modelRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(modelRepositoryMock.update).toHaveBeenCalledWith(data);
        expect(result).toEqual(mockedDataUpdate);
    })

    it("Não deve permitir atualizar onde não há marcas ❌", async () => {

        modelRepositoryMock.findById.mockResolvedValue(null);
        const data: UpdateModelDTO = { name: "TesteName", id: "1"}

        await expect(updateModelUseCase.execute(data, "valid-token")).rejects.toThrow("Modelo não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(modelRepositoryMock.update).not.toHaveBeenCalled();
    })

})