import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { CreateUserUseCase } from "../../../useCases/createUser.ts/CreateUserUseCase";
import { UsersRepository } from "../../../infra/prisma/repositories/UsersRepository";
import { UsersDTO } from "../../../dtos/UsersDTO";
import { CreateUserDTO } from "../../../dtos/CreateUserDTO";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Create User Use Case", () => {

    let createUserUseCase: CreateUserUseCase;
    let usersRepositoryMock: jest.Mocked<UsersRepository>;

    beforeEach(() =>{
        usersRepositoryMock = {
            findExistingUsers: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<UsersRepository>;
    
        createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
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
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: "valid-token",
        updatedById: null,
        deletedById: null
    }

    it("Deve criar um novo usuário com sucesso ✅", async () => {

        usersRepositoryMock.findExistingUsers.mockResolvedValue([]);
        usersRepositoryMock.create.mockResolvedValue(mockedData);
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const data: CreateUserDTO = {name: "teste", nationalId: "123", email: "maria@", password: "123", birthdate: new Date(), contact: "920001200"}
        const result = await createUserUseCase.execute(data, "valid-token")

        expect(result).toHaveProperty("id");
        expect(result.name).toBe("TesteName");
        expect(result.createdById).toBe("valid-token");
    })


    it("Deve cadastrar um novo usuário com sucesso ✅", async () => {

        usersRepositoryMock.findExistingUsers.mockResolvedValue([]);
        usersRepositoryMock.create.mockResolvedValue(mockedData);

        const data: CreateUserDTO = {name: "teste", nationalId: "123", email: "maria@", password: "123", birthdate: new Date(), contact: "920001200"}
        const result = await createUserUseCase.execute(data)

        expect(result).toHaveProperty("id");
        expect(result.name).toBe("TesteName");
        expect(result.createdById).toBe("valid-token");
    })


    it("Não deve permitir a criação de marcas iguais ❌", async () => {
        usersRepositoryMock.findExistingUsers.mockResolvedValue([mockedData]);
        const data: CreateUserDTO = {name: "teste", nationalId: "123", email: "maria@", password: "123", birthdate: new Date(), contact: "920001200"} 
        
        await expect(createUserUseCase.execute(data, "valid-token")).rejects.toThrow("Usuário já cadastrado");
        expect(usersRepositoryMock.create).not.toHaveBeenCalled();
    })

})

// __________ Testes Realistas Usuário ____________

// it("deve criar um usuário com sucesso", async () => {
//     const userData = createMockUserData();
//     const plainPassword = userData.password
//     const hashedPassword = "hashedPassword123";
//     const mockUserResponse = createMockUserResponse();

//     mockUserRepository.findByEmail.mockResolvedValue(null);
//     mockUserRepository.findByNationalId.mockResolvedValue(null);
//     mockGenerateHashedPassword.mockResolvedValue(hashedPassword);
//     mockUserRepository.create.mockResolvedValue(mockUserResponse);

//     const result = await createUserUseCase.execute(userData);

//     expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
//     expect(mockUserRepository.findByNationalId).toHaveBeenCalledWith(userData.nationalId);
//     expect(mockGenerateHashedPassword).toHaveBeenCalledWith(plainPassword);
//     expect(mockUserRepository.create).toHaveBeenCalledWith(
//       { ...userData, password: hashedPassword },
//       undefined
//     );
//     expect(result).toEqual(mockUserResponse);
//   });

//   it("deve criar usuário com createdById quando fornecido", async () => {
//     const userData = createMockUserData();
//     const hashedPassword = "hashedPassword123";
//     const mockUserResponse = createMockUserResponse();
//     const createdById = "admin-user-id";

//     mockUserRepository.findByEmail.mockResolvedValue(null);
//     mockUserRepository.findByNationalId.mockResolvedValue(null);
//     mockGenerateHashedPassword.mockResolvedValue(hashedPassword);
//     mockUserRepository.create.mockResolvedValue(mockUserResponse);

//     const result = await createUserUseCase.execute(userData, createdById);

//     expect(mockUserRepository.create).toHaveBeenCalledWith(
//       { ...userData, password: hashedPassword },
//       createdById
//     );
//   });

//   it("deve lançar erro quando email já existe", async () => {
//     const userData = createMockUserData();
//     const existingUser = createMockUserResponse();

//     mockUserRepository.findByEmail.mockResolvedValue(existingUser);

//     await expect(
//       createUserUseCase.execute(userData)
//     ).rejects.toThrow(ConflictError);
//   });

//   it("deve lançar erro quando CPF já existe", async () => {
//     const userData = createMockUserData();
//     const existingUser = createMockUserResponse();

//     mockUserRepository.findByEmail.mockResolvedValue(null);
//     mockUserRepository.findByNationalId.mockResolvedValue(existingUser);

//     await expect(
//       createUserUseCase.execute(userData)
//     ).rejects.toThrow(ConflictError);
//   });

//   it("deve criar usuário sem CPF quando não fornecido", async () => {
//     const userData = createMockUserData({ nationalId: undefined });
//     const hashedPassword = "hashedPassword123";
//     const mockUserResponse = createMockUserResponse({ nationalId: undefined });

//     mockUserRepository.findByEmail.mockResolvedValue(null);
//     mockGenerateHashedPassword.mockResolvedValue(hashedPassword);
//     mockUserRepository.create.mockResolvedValue(mockUserResponse);

//     const result = await createUserUseCase.execute(userData);

//     expect(mockUserRepository.findByNationalId).not.toHaveBeenCalled();
//     expect(mockUserRepository.create).toHaveBeenCalledWith(
//       expect.objectContaining({ nationalId: undefined }),
//       undefined
//     );
//   });

//   it("deve garantir que a senha é hasheada antes de criar", async () => {
//     const userData = createMockUserData();
//     const hashedPassword = "hashedPassword123";
//     const mockUserResponse = createMockUserResponse();

//     mockUserRepository.findByEmail.mockResolvedValue(null);
//     mockUserRepository.findByNationalId.mockResolvedValue(null);
//     mockGenerateHashedPassword.mockResolvedValue(hashedPassword);
//     mockUserRepository.create.mockResolvedValue(mockUserResponse);

//     await createUserUseCase.execute(userData);

//     expect(mockUserRepository.create).toHaveBeenCalledWith(
//       expect.objectContaining({ password: hashedPassword }),
//       undefined
//     );
//   });
// });