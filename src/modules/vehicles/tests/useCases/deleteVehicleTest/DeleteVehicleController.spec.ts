
import "reflect-metadata";
import { describe } from "node:test";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteVehicleUseCase } from "../../../useCases/deleteVehicle/DeleteVehicleUseCase";
import { DeleteVehicleController } from "../../../useCases/deleteVehicle/DeleteVehicleController";

describe("Delete Model Controller", () => {
    let deleteVehicleUseCaseMock: jest.Mocked<DeleteVehicleUseCase>;
    let deleteVehicleControllerMock: DeleteVehicleController;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(()=>{
        deleteVehicleUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<DeleteVehicleUseCase>

        jest.spyOn(container, "resolve").mockReturnValue(deleteVehicleUseCaseMock);

        deleteVehicleControllerMock = new DeleteVehicleController();

        request = {
            headers: { authorization: "token123"},
            params: {id: "1"}
        };
1
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    

    it("Deve chamar o Use Case e retornar 200", async () => {
        deleteVehicleUseCaseMock.execute.mockResolvedValue();
        await deleteVehicleControllerMock.handle(request as Request, response as Response);

        expect(deleteVehicleUseCaseMock.execute).toHaveBeenCalledWith(request.params?.id, request.headers?.authorization);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.json).toHaveBeenCalledWith({message: "Deletado com sucesso!"})
    })

    it("deve retornar status 400 se o use case lançar um erro", async () => {
        const errorMessage = "Erro ao deletar.";
        deleteVehicleUseCaseMock.execute.mockRejectedValue(new Error(errorMessage));

        await deleteVehicleControllerMock.handle(request as Request, response as Response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})