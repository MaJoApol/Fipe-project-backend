import "reflect-metadata";
import { describe } from "node:test";
import { CreateBrandUseCase } from "../../../useCases/createBrands/CreateBrandUseCase";
import { BrandsRepository } from "../../../infra/prisma/repositories/brandsRepository";
import { CreateBrandDTO } from "../../../dtos/CreateBrandDTO";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { findTokenId } from "../../../../../utils/findTokenId";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Create Brand Use Case", () => {

    let createBrandUseCase: CreateBrandUseCase;
    let brandsRepositoryMock: jest.Mocked<BrandsRepository>;

    beforeEach(() =>{
        brandsRepositoryMock = {
            findExistingBrands: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<BrandsRepository>;
    
        createBrandUseCase = new CreateBrandUseCase(brandsRepositoryMock);
    })

    
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


    it("Deve criar uma nova marca com sucesso ✅", async () => {

        brandsRepositoryMock.findExistingBrands.mockResolvedValue([]);
        brandsRepositoryMock.create.mockResolvedValue(mockedData);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: CreateBrandDTO = {name: "sla mano"}
        const result = await createBrandUseCase.execute(data, "valid-token")

        expect(result).toHaveProperty("id");
        expect(result.name).toBe("TesteName");
        expect(result.createdById).toBe("valid-token");
    })

    it("Não deve permitir a criação de marcas iguais ❌", async () => {
        brandsRepositoryMock.findExistingBrands.mockResolvedValue([mockedData]);
        const data: CreateBrandDTO = {name: "TesteName"}

        await expect(createBrandUseCase.execute(data, "valid-token")).rejects.toThrow("Marca já existe");
        expect(brandsRepositoryMock.create).not.toHaveBeenCalled();
    })

})


// ----------------- OUTROS EXEMPLOS DE COISAS PARA SEREM TESTADAS -------------------------

// it("deve criar uma nova marca com sucesso", async () => {
//     const mockData: CreateBrandDTO = {
//       name: "Nova Marca",
//       fipeCode: "1234",
//     };

//     mockBrandRepository.findByName.mockResolvedValue(null);
//     mockBrandRepository.create.mockResolvedValue(createMockBrand(mockData));

//     const result = await createBrandUseCase.execute(mockData, "usuario-id");

//     expect(mockBrandRepository.findByName).toHaveBeenCalledWith("Nova Marca");
//     expect(mockBrandRepository.create).toHaveBeenCalledWith(mockData, "usuario-id");
//     expect(result.name).toBe("Nova Marca");
//     expect(result.fipeCode).toBe("1234");
//   });

//   it("deve criar marca sem código fipe quando não fornecido", async () => {
//     const mockData: CreateBrandDTO = {
//       name: "Marca Sem Fipe",
//     };

//     mockBrandRepository.findByName.mockResolvedValue(null);
//     mockBrandRepository.create.mockResolvedValue(createMockBrand({ 
//       ...mockData, 
//       fipeCode: undefined 
//     }));

//     const result = await createBrandUseCase.execute(mockData, "usuario-id");

//     expect(result.name).toBe("Marca Sem Fipe");
//     expect(result.fipeCode).toBeUndefined();
//   });

//   it("deve lançar erro quando marca com mesmo nome já existe", async () => {
//     const mockData: CreateBrandDTO = {
//       name: "Marca Existente",
//     };

//     mockBrandRepository.findByName.mockResolvedValue(createMockBrand());

//     await expect(
//       createBrandUseCase.execute(mockData, "usuario-id")
//     ).rejects.toThrow(ConflictError);

//     expect(mockBrandRepository.create).not.toHaveBeenCalled();
//   });

//   it("deve incluir createdBy no registro criado", async () => {
//     const mockData: CreateBrandDTO = {
//       name: "Marca com Criador",
//     };

//     mockBrandRepository.findByName.mockResolvedValue(null);
//     mockBrandRepository.create.mockResolvedValue(
//       createMockBrand({ ...mockData, createdById: "usuario-especifico" })
//     );

//     const result = await createBrandUseCase.execute(mockData, "usuario-especifico");

//     expect(result.createdById).toBe("usuario-especifico");
//   });

//   it("deve garantir que campos obrigatórios estão presentes", async () => {
//     const mockData: CreateBrandDTO = {
//       name: "Marca Válida",
//     };

//     mockBrandRepository.findByName.mockResolvedValue(null);
//     mockBrandRepository.create.mockResolvedValue(createMockBrand(mockData));

//     const result = await createBrandUseCase.execute(mockData, "usuario-id");

//     expect(result.name).toBeDefined();
//     expect(result.createdAt).toBeDefined();
//     expect(result.id).toBeDefined();
//   });
// });