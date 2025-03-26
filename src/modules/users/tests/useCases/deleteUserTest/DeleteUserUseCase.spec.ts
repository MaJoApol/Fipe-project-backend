import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { DeleteUserUseCase } from "../../../useCases/deleteUsers.ts/deleteUserUseCase";
import { UsersRepository } from "../../../infra/prisma/repositories/UsersRepository";
import { UsersDTO } from "../../../dtos/UsersDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Delete Model Use Case", () => {

    let deleteUserUseCase: DeleteUserUseCase;
    let usersRepositoryMock: jest.Mocked<UsersRepository>;

    beforeEach(() =>{
        usersRepositoryMock = {
            findById: jest.fn(),
            remove: jest.fn(),
        } as unknown as jest.Mocked<UsersRepository>;
    
        deleteUserUseCase = new DeleteUserUseCase(usersRepositoryMock);
    })
    
    const mockedData: UsersDTO = {
        name: "TesteName",
        id: "1",
        token: "1",
        nationalId: "1234",
        email: "@",
        password: "213",
        contact: null,
        birthdate: null,
        isDeleted: true,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: new Date(),
        createdById: "valid-token",
        updatedById: null,
        deletedById: "2"
    }


    it("Deve deleter uma nova marca com sucesso ✅", async () => {

        usersRepositoryMock.findById.mockResolvedValue(mockedData);
        usersRepositoryMock.remove.mockResolvedValue();
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const id: string = "1"
        const result = await deleteUserUseCase.execute(id, "valid-token")

        expect(usersRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(usersRepositoryMock.remove).toHaveBeenCalledWith(id, "valid-token");
        expect(result).toEqual(undefined);
    })

    it("Não deve permitir deletar onde não há marcas ❌", async () => {

        usersRepositoryMock.findById.mockResolvedValue(null);
        const id: string = "1"

        await expect(deleteUserUseCase.execute(id, "valid-token")).rejects.toThrow("Usuário não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(usersRepositoryMock.remove).not.toHaveBeenCalled();
    })

})