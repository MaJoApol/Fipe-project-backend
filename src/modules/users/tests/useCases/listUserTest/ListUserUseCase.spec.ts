import "reflect-metadata";
import { describe } from "node:test";
import { ListModelUseCase } from "../../../useCases/listModel/ListModelUseCase";
import { ModelsRepository } from "../../../infra/prisma/repositories/ModelsRepository";
import { ModelDTO } from "../../../dtos/ModelDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("List Brand Use Case", () => {

    let listModelUseCase: ListModelUseCase;
    let modelsRepositoryMock: jest.Mocked<ModelsRepository>;

    beforeEach(() =>{
        modelsRepositoryMock = {
            list: jest.fn(),
        } as unknown as jest.Mocked<ModelsRepository>;
    
        listModelUseCase = new ListModelUseCase(modelsRepositoryMock);
    })

    
    function MockedData(pageNumber: number){
        var mockedData: ModelDTO[] = []
        for (var i = 0; i < pageNumber; i++){
            mockedData.push(
                {
                    id: `model-${i + 1}`,
                    name: `Model ${i + 1}`,
                    brandId: `Brand Id ${i + 1}`,
                    fipeCode: null,
                    createdAt: new Date(),
                    updatedAt: null,
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
        const mockedData = MockedData(10);
        modelsRepositoryMock.list.mockResolvedValue(mockedData);
        const page = 1;
        const pageSize = 10;
        const result = await listModelUseCase.execute(page, pageSize);

        expect(modelsRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual(mockedData);
        expect(result.length).toBe(pageSize);
    })

    it("Deve retornar uma lista vazia caso não haja marcas ❌", async () => {
        modelsRepositoryMock.list.mockResolvedValue([]);

        const page = 1;
        const pageSize = 10;
        const result = await listModelUseCase.execute(page, pageSize);
        expect(modelsRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual([]);
    })

})