import "reflect-metadata";
import { describe } from "node:test";
import { ListBrandUseCase } from "../../../useCases/listBrands/ListBrandsUseCase";
import { BrandsRepository } from "../../../infra/prisma/repositories/brandsRepository";
import { CreateBrandDTO } from "../../../dtos/CreateBrandDTO";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { findTokenId } from "../../../../../utils/findTokenId";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("List Brand Use Case", () => {

    let listBrandUseCase: ListBrandUseCase;
    let brandsRepositoryMock: jest.Mocked<BrandsRepository>;

    beforeEach(() =>{
        brandsRepositoryMock = {
            list: jest.fn(),
        } as unknown as jest.Mocked<BrandsRepository>;
    
        listBrandUseCase = new ListBrandUseCase(brandsRepositoryMock);
    })

    
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

    it("Deve criar uma nova marca com sucesso ✅", async () => {
        const mockedData = MockedData(5);
        brandsRepositoryMock.list.mockResolvedValue(mockedData);
        const page = 1;
        const pageSize = 5;
        const result = await listBrandUseCase.execute(page, pageSize);
        console.log(result)

        expect(brandsRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual(mockedData);
        expect(result.length).toBe(pageSize);
    })

    // it("Não deve permitir a criação de marcas iguais ❌", async () => {
    //     brandsRepositoryMock.findExistingBrands.mockResolvedValue([mockedData]);
    //     const data: CreateBrandDTO = {name: "TesteName"}

    //     await expect(listBrandUseCase.execute(data, "valid-token")).rejects.toThrow("Marca já existe");
    //     expect(brandsRepositoryMock.create).not.toHaveBeenCalled();
    // })

})