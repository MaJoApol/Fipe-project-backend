import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { DeleteModelUseCase } from "../../../useCases/deleteModel/DeleteModelUseCase";
import { ModelsRepository } from "../../../infra/prisma/repositories/ModelsRepository";
import { ModelDTO } from "../../../dtos/ModelDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Delete Model Use Case", () => {

    let deleteModelUseCase: DeleteModelUseCase;
    let modelsRepositoryMock: jest.Mocked<ModelsRepository>;

    beforeEach(() =>{
        modelsRepositoryMock = {
            findById: jest.fn(),
            remove: jest.fn(),
        } as unknown as jest.Mocked<ModelsRepository>;
    
        deleteModelUseCase = new DeleteModelUseCase(modelsRepositoryMock);
    })
    
    const mockedData: ModelDTO = {
        name: "TesteName",
        id: "1",
        brandId: "1",
        fipeCode: null,
        isDeleted: true,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: new Date(),
        createdById: null,
        updatedById: null,
        deletedById: "valid-token"
    }


    it("Deve deleter uma nova marca com sucesso ✅", async () => {

        modelsRepositoryMock.findById.mockResolvedValue(mockedData);
        modelsRepositoryMock.remove.mockResolvedValue();
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const id: string = "1"
        const result = await deleteModelUseCase.execute(id, "valid-token")

        expect(modelsRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(modelsRepositoryMock.remove).toHaveBeenCalledWith(id, "valid-token");
        expect(result).toEqual(undefined);
    })

    it("Não deve permitir deletar onde não há marcas ❌", async () => {

        modelsRepositoryMock.findById.mockResolvedValue(null);
        const id: string = "1"

        await expect(deleteModelUseCase.execute(id, "valid-token")).rejects.toThrow("Modelo não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(modelsRepositoryMock.remove).not.toHaveBeenCalled();
    })

})