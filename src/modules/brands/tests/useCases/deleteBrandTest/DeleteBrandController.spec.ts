
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteBrandUseCase } from "../../../useCases/deleteBrands/DeleteBrandUseCase";
import { DeleteBrandController } from "../../../useCases/deleteBrands/DeleteBrandController";



describe("Delete Brands Controller", () => {
    let deleteBrandUseCaseMock: jest.Mocked<DeleteBrandUseCase>;
    let deleteBrandControllerMock: DeleteBrandController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        deleteBrandUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<DeleteBrandUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(deleteBrandUseCaseMock);

        deleteBrandControllerMock = new DeleteBrandController();

        request = {
            headers: { authorization: "token123"},
            params: {id: "1"}
        };

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    

    it("Deve chamar o Use Case e retornar 200", async () => {
        deleteBrandUseCaseMock.execute.mockResolvedValue();
        await deleteBrandControllerMock.handle(request as Request, response as Response);

        expect(deleteBrandUseCaseMock.execute).toHaveBeenCalledWith(request.params?.id, request.headers?.authorization);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.json).toHaveBeenCalledWith({message: "Deletado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao deletar.";
        deleteBrandUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await deleteBrandControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})