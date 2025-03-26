import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { UpdateUserUseCase } from "../../../useCases/updateUsers.ts/UpdateUserUseCase";
import { UsersRepository } from "../../../infra/prisma/repositories/UsersRepository";
import { UsersDTO } from "../../../dtos/UsersDTO";
import { UpdateUserDTO } from "../../../dtos/UpdateUserDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Update Model Use Case", () => {

    let updateUserUseCase: UpdateUserUseCase;
    let usersRepositoryMock: jest.Mocked<UsersRepository>;

    beforeEach(() =>{
        usersRepositoryMock = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<UsersRepository>;
    
        updateUserUseCase = new UpdateUserUseCase(usersRepositoryMock);
    })
    
    const mockedData: UsersDTO = {
        name: "Maria",
        id: "1",
        token: "valid-token",
        nationalId: "111.111.111-11",
        email: "maria@gmail.com",
        password: "maria123",
        contact: null,
        birthdate: null,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: null,
        updatedById: null,
        deletedById: null
    }


    const mockedDataUpdate: UsersDTO = {
        name: "Maria Joana",
        id: "1",
        token: "valid-token",
        nationalId: "111.111.111-11",
        email: "mariajoana@gmail.com",
        password: "joana123",
        contact: null,
        birthdate: null,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdById: null,
        updatedById: "1",
        deletedById: null
    }


    it("Deve atualizar uma nova marca com sucesso quando as condições são atendidas ✅", async () => {
        
        usersRepositoryMock.findById.mockResolvedValue(mockedData);
        (findTokenId as jest.Mock).mockReturnValue("1")
        usersRepositoryMock.update.mockResolvedValue(mockedDataUpdate)
        const data: UpdateUserDTO = {
            id: "1",
            name: "Maria Joana",
            nationalId: "111.111.111-11",
            email: "mariajoana@gmail.com",
            password: "joana123",
            birthdate: null,
            contact: null
        };
        
        const updatedResult = await updateUserUseCase.execute(data, "1")

        expect(usersRepositoryMock.update).toHaveBeenCalledWith(data)
        expect(updatedResult).toEqual(mockedDataUpdate)
        expect(findTokenId).toHaveBeenCalledWith(data.id)
       
    })

    it("Não deve permitir atualizar onde não há usuário ❌", async () => {

        usersRepositoryMock.findById.mockResolvedValue(null);
        const data: UpdateUserDTO = {
            id: "1",
            name: "Maria Joana",
            nationalId: "111.111.111-11",
            email: "mariajoana@gmail.com",
            password: "joana123",
            birthdate: null,
            contact: null
        };

        expect(usersRepositoryMock.update).not.toHaveBeenCalled();
        expect(updateUserUseCase.execute(data, "valid-token")).rejects.toThrow("Usuário não existe!");
    })

    it("should throw an error if trying to change another user's password", async () => {
        usersRepositoryMock.findById.mockReturnValue(Promise.resolve(mockedData));
        (findTokenId as jest.Mock).mockReturnValue("user456");
        const data = { id: "user123", password: "newPassword" } as UpdateUserDTO;

        await expect(updateUserUseCase.execute(data, "validToken"))
            .rejects.toThrow("Você só pode alterar a senha do seu próprio usuário.");
    });

})