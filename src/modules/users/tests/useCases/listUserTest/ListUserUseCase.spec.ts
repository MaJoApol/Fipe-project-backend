import "reflect-metadata";
import { describe } from "node:test";
import { ListUserUseCase } from "../../../useCases/listUser.ts/ListUserUseCase";
import { UsersRepository } from "../../../infra/prisma/repositories/UsersRepository";
import { UsersDTO } from "../../../dtos/UsersDTO";


jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("List Brand Use Case", () => {

    let listUserUseCase: ListUserUseCase;
    let usersRepositoryMock: jest.Mocked<UsersRepository>;

    beforeEach(() =>{
        usersRepositoryMock = {
            list: jest.fn(),
        } as unknown as jest.Mocked<UsersRepository>;
    
        listUserUseCase = new ListUserUseCase(usersRepositoryMock);
    })

    
    function MockedData(pageNumber: number){
        var mockedData: UsersDTO[] = []
        for (var i = 0; i < pageNumber; i++){
            mockedData.push(
                {
                    id: `user-${i + 1}`,
                    token: "",
                    name: `User ${i + 1}`,
                    nationalId: `User cpf ${i + 1}`,
                    email: `User email ${i + 1}`,
                    password: `User email ${i + 1}`,
                    birthdate: null,
                    contact: null,
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
        usersRepositoryMock.list.mockResolvedValue(mockedData);
        const page = 1;
        const pageSize = 10;
        const result = await listUserUseCase.execute(page, pageSize);

        expect(usersRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual(mockedData);
        expect(result.length).toBe(pageSize);
    })

    it("Deve retornar uma lista vazia caso não haja marcas ❌", async () => {
        usersRepositoryMock.list.mockResolvedValue([]);

        const page = 1;
        const pageSize = 10;
        const result = await listUserUseCase.execute(page, pageSize);
        expect(usersRepositoryMock.list).toHaveBeenCalledWith(page, pageSize);
        expect(result).toEqual([]);
    })

})