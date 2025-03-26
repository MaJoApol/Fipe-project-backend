import "reflect-metadata";
import { describe } from "node:test";
import { BrandsRepository } from "../../../infra/prisma/repositories/brandsRepository";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { findTokenId } from "../../../../../utils/findTokenId";
import { DeleteBrandUseCase } from "../../../useCases/deleteBrands/DeleteBrandUseCase";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Delete Brand Use Case", () => {

    let deleteBrandUseCase: DeleteBrandUseCase;
    let brandsRepositoryMock: jest.Mocked<BrandsRepository>;

    beforeEach(() =>{
        brandsRepositoryMock = {
            findById: jest.fn(),
            remove: jest.fn(),
        } as unknown as jest.Mocked<BrandsRepository>;
    
        deleteBrandUseCase = new DeleteBrandUseCase(brandsRepositoryMock);
    })
    
    const mockedData: BrandDTO = {
        name: "TesteName",
        id: "1",
        fipeCode: null,
        isDeleted: true,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: null,
        updatedById: null,
        deletedById: "valid-token"
    }


    it("Deve deleter uma nova marca com sucesso ✅", async () => {

        brandsRepositoryMock.findById.mockResolvedValue(mockedData);
        brandsRepositoryMock.remove.mockResolvedValue();
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const id: string = "1"
        const result = await deleteBrandUseCase.execute(id, "valid-token")

        expect(brandsRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(brandsRepositoryMock.remove).toHaveBeenCalledWith(id, "valid-token");
        expect(result).toEqual(undefined);
    })

    it("Não deve permitir deletar onde não há marcas ❌", async () => {

        brandsRepositoryMock.findById.mockResolvedValue(null);
        const id: string = "1"

        await expect(deleteBrandUseCase.execute(id, "valid-token")).rejects.toThrow("Marca não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(brandsRepositoryMock.remove).not.toHaveBeenCalled();
    })

})