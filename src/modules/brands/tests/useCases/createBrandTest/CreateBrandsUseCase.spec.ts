import "reflect-metadata";
import { describe } from "node:test";
import { CreateBrandUseCase } from "../../../useCases/createBrands/CreateBrandUseCase";
import { BrandsRepository } from "../../../infra/prisma/repositories/brandsRepository";
import { CreateBrandDTO } from "../../../dtos/CreateBrandDTO";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { findTokenId } from "../../../../../utils/findTokenId";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

// describe("CreateBrandUseCase", () => {
//   let createBrandUseCase: CreateBrandUseCase;
//   let brandsRepositoryMock: jest.Mocked<BrandsRepository>;

//   beforeEach(() => {      // o q vai fazer antes dps testes start
//     brandsRepositoryMock = {
//       findExistingBrands: jest.fn(), // dizer que é uma função mockada (de teste)
//       create: jest.fn(),
//     } as unknown as jest.Mocked<BrandsRepository>;

//     createBrandUseCase = new CreateBrandUseCase(brandsRepositoryMock);
//   });


//   it("Deve criar uma nova marca com sucesso ✅", async () => {

//     brandsRepositoryMock.findExistingBrands.mockResolvedValue([]); // simula que a marca Não existe no banco
    
//     brandsRepositoryMock.create.mockResolvedValue({id: "1", name: "Nike", fipeCode: "12345", createdAt: new Date(), updatedAt: new Date(), }); // 🔹 Simula a criação da marca no banco de dados

//     (findTokenId as jest.Mock).mockReturnValue("user123");

//     const data: CreateBrandDTO = { name: "Nike" };
//     const result = await createBrandUseCase.execute(data, "valid-token");

//     expect(result).toHaveProperty("id");
//     expect(result.name).toBe("Nike");
//     expect(result.createdById).toBe("user123");
//   });

//   it("não deve criar uma marca se já existir", async () => {
//     brandsRepositoryMock.findExistingBrands.mockResolvedValue([{ id: "1", name: "Nike" }]);

//     const data: CreateBrandDTO = { name: "Nike" };

//     await expect(createBrandUseCase.execute(data, "valid-token")).rejects.toThrow("Marca já existe");
//   });
// });



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