import "reflect-metadata";
import { describe } from "node:test";
import { ListBrandUseCase } from "../../../useCases/listBrands/ListBrandsUseCase";
import { BrandsRepository } from "../../../infra/prisma/repositories/brandsRepository";
import { BrandDTO } from "../../../dtos/BrandDTO";


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

    it("Deve criar mostrar os dados sucesso ✅", async () => {
        const mockedData = MockedData(5);
        brandsRepositoryMock.list.mockResolvedValue(mockedData);
        const page = 1;
        const pageSize = 5;
        const result = await listBrandUseCase.execute(page, pageSize);

        expect(brandsRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual(mockedData);
        expect(result.length).toBe(pageSize);
    })

    it("Deve retornar uma lista vazia caso não haja marcas ❌", async () => {
        brandsRepositoryMock.list.mockResolvedValue([]);

        const page = 1;
        const pageSize = 5;
        const result = await listBrandUseCase.execute(page, pageSize);
        expect(brandsRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual([]);
    })

})