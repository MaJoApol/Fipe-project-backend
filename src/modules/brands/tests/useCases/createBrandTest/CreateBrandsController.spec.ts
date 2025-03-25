
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { CreateBrandUseCase } from "../../../useCases/createBrands/CreateBrandUseCase";
import { Request, Response } from "express";
import { BrandDTO } from "../../../dtos/BrandDTO";
import { CreateBrandController } from "../../../useCases/createBrands/CreateBrandController";

describe("Create Brands Controller", () => {
    let createBrandUseCaseMock: jest.Mocked<CreateBrandUseCase>;
    let createBrandController: CreateBrandController;
    let request: Request;
    let response: Response;

    beforeEach(()=>{
        createBrandUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<CreateBrandUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(createBrandUseCaseMock);

        createBrandController = new CreateBrandController();

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"}
        } as jest.Mocked<Request>;

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as jest.Mocked<Response>;
    });

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
    

    it("Deve chamar o Use Case e retornar 201", async () => {
        createBrandUseCaseMock.execute.mockResolvedValue(mockedData);
        await createBrandController.handle(request, response);

        expect(createBrandUseCaseMock.execute).toHaveBeenCalledWith(request.body, "token123");
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({message: "Criado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao criar a marca";
        createBrandUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await createBrandController.handle(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})



// ----------------- OUTROS EXEMPLOS DE COISAS PARA SEREM TESTADAS -------------------------


// it("deve criar uma marca com sucesso e retornar status 201", async () => {
//     const mockBrandData = {
//       name: "Nova Marca",
//       fipeCode: "1234",
//     };
//     mockRequest.body = mockBrandData;

//     const mockCreatedBrand = {
//       id: "marca-id",
//       ...mockBrandData,
//       createdById: "user-id",
//     };

//     const mockExecute = jest.fn().mockResolvedValue(mockCreatedBrand);
//     (CreateBrandUseCase as jest.Mock).mockImplementation(() => ({
//       execute: mockExecute,
//     }));

//     await createBrandController.handle(
//       mockRequest as Request,
//       mockResponse as Response,
//       mockNext
//     );

//     expect(mockResponse.status).toHaveBeenCalledWith(201);
//     expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedBrand);
//   });

//   it("deve retornar erro 401 quando usuário não está autenticado", async () => {
//     mockRequest.user = undefined;

//     await createBrandController.handle(
//       mockRequest as Request,
//       mockResponse as Response,
//       mockNext
//     );

//     expect(mockNext).toHaveBeenCalledWith(expect.any(UnauthorizedError));
//     expect(mockResponse.status).not.toHaveBeenCalled();
//   });

//   it("deve chamar next com erro quando use case lançar exceção", async () => {
//     const mockError = new Error("Erro de teste");
//     mockRequest.body = { name: "Marca Teste" };

//     const mockExecute = jest.fn().mockRejectedValue(mockError);
//     (CreateBrandUseCase as jest.Mock).mockImplementation(() => ({
//       execute: mockExecute,
//     }));

//     await createBrandController.handle(
//       mockRequest as Request,
//       mockResponse as Response,
//       mockNext
//     );

//     expect(mockNext).toHaveBeenCalledWith(mockError);
//   });

//   it("deve criar marca mesmo sem código fipe", async () => {
//     const mockBrandData = { name: "Marca sem Fipe" };
//     mockRequest.body = mockBrandData;

//     const mockCreatedBrand = {
//       id: "marca-id",
//       ...mockBrandData,
//       fipeCode: undefined,
//       createdById: "user-id",
//     };

//     const mockExecute = jest.fn().mockResolvedValue(mockCreatedBrand);
//     (CreateBrandUseCase as jest.Mock).mockImplementation(() => ({
//       execute: mockExecute,
//     }));

//     await createBrandController.handle(
//       mockRequest as Request,
//       mockResponse as Response,
//       mockNext
//     );

//     expect(mockExecute).toHaveBeenCalledWith(mockBrandData, "user-id");
//     expect(mockResponse.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         name: "Marca sem Fipe",
//         fipeCode: undefined,
//       })
//     );
//   });

//   it("deve garantir que o createdById veio do usuário autenticado", async () => {
//     const mockBrandData = { name: "Marca com Criador" };
//     mockRequest.body = mockBrandData;
//     mockRequest.user = {
//       id: "user-req",
//       name: "John Doe",
//       email: "john.doe@example.com",
//       password: "hashedPassword123",
//       refreshToken: "refreshToken123",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       deletedAt: null,
//       isDeleted: false,
//       createdById: null,
//       updatedById: null,
//       deletedById: null,
//       birthdate: null,
//       contact: null,
//       nationalId: null,
//     };

//     const mockCreatedBrand = {
//       id: "marca-id",
//       ...mockBrandData,
//       createdById: "user-req",
//     };

//     const mockExecute = jest.fn().mockResolvedValue(mockCreatedBrand);
//     (CreateBrandUseCase as jest.Mock).mockImplementation(() => ({
//       execute: mockExecute,
//     }));

//     await createBrandController.handle(
//       mockRequest as Request,
//       mockResponse as Response,
//       mockNext
//     );

//     expect(mockExecute).toHaveBeenCalledWith(mockBrandData, "user-req");
//   });
// });