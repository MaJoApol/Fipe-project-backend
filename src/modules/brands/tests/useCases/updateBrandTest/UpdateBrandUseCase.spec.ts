import "reflect-metadata";
import { describe } from "node:test";
import { BrandsRepository } from "../../../infra/prisma/repositories/brandsRepository";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { findTokenId } from "../../../../../utils/findTokenId";
import { UpdateBrandUseCase } from "../../../useCases/updateBrands/UpdateBrandUseCase";
import { UpdateBrandDTO } from "../../../dtos/UpdateBrandDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Update Brand Use Case", () => {

    let updateBrandUseCase: UpdateBrandUseCase;
    let brandsRepositoryMock: jest.Mocked<BrandsRepository>;

    beforeEach(() =>{
        brandsRepositoryMock = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<BrandsRepository>;
    
        updateBrandUseCase = new UpdateBrandUseCase(brandsRepositoryMock);
    })
    
    const mockedData: BrandDTO = {
        name: "TesteName",
        id: "1",
        fipeCode: null,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: "valid-token",
        updatedById: null,
        deletedById: null
    }

    const mockedDataUpdate: BrandDTO = {
        name: "Nome Diferente",
        id: "1",
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

        brandsRepositoryMock.findById.mockResolvedValue(mockedData);
        brandsRepositoryMock.update.mockResolvedValue(mockedDataUpdate);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: UpdateBrandDTO = { name: "TesteName", id: "1"}
        const result = await updateBrandUseCase.execute(data, "valid-token")

        expect(brandsRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(brandsRepositoryMock.update).toHaveBeenCalledWith(data);
        expect(result).toEqual(mockedDataUpdate);
    })

    it("Não deve permitir atualizar onde não há marcas ❌", async () => {

        brandsRepositoryMock.findById.mockResolvedValue(null);
        const data: UpdateBrandDTO = { name: "TesteName", id: "1"}

        await expect(updateBrandUseCase.execute(data, "valid-token")).rejects.toThrow("Marca não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(brandsRepositoryMock.update).not.toHaveBeenCalled();
    })

})