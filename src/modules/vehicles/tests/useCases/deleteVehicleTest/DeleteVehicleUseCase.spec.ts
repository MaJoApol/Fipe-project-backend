import "reflect-metadata";
import { describe } from "node:test";
import { findTokenId } from "../../../../../utils/findTokenId";
import { VehicleDTO } from "../../../dtos/VehicleDTO";
import { DeleteVehicleUseCase } from "../../../useCases/deleteVehicle/DeleteVehicleUseCase";
import { VehiclesRepository } from "../../../infra/prisma/repository/VehiclesRepository";

jest.mock("../../../../../utils/findTokenId"); // simulado a função findTokenId

describe("Delete Model Use Case", () => {

    let deleteVehicleUseCase: DeleteVehicleUseCase;
    let vehiclesRepositoryMock: jest.Mocked<VehiclesRepository>;

    beforeEach(() =>{
        vehiclesRepositoryMock = {
            findById: jest.fn(),
            remove: jest.fn(),
        } as unknown as jest.Mocked<VehiclesRepository>;
    
        deleteVehicleUseCase = new DeleteVehicleUseCase(vehiclesRepositoryMock);
    })
    
    const mockedData: VehicleDTO = {
        value: 120000,
        fuelTypeId: "1",
        referenceMonth: 12,
        referenceYear: 2012,
        vehicleYear: 2010,
        modelId: "1",
        id: "1",
        fipeCode: "123",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        createdById: "valid-token",
        updatedById: null,
        deletedById: null
    }

    it("Deve deleter uma nova marca com sucesso ✅", async () => {

        vehiclesRepositoryMock.findById.mockResolvedValue(mockedData);
        vehiclesRepositoryMock.remove.mockResolvedValue();
        (findTokenId as jest.Mock).mockReturnValue("valid-token")

        const id: string = "1"
        const result = await deleteVehicleUseCase.execute(id, "valid-token")

        expect(vehiclesRepositoryMock.findById).toHaveBeenCalledWith("1");
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(vehiclesRepositoryMock.remove).toHaveBeenCalledWith(id, "valid-token");
        expect(result).toEqual(undefined);
    })

    it("Não deve permitir deletar onde não há marcas ❌", async () => {

        vehiclesRepositoryMock.findById.mockResolvedValue(null);
        const id: string = "1"

        await expect(deleteVehicleUseCase.execute(id, "valid-token")).rejects.toThrow("Veículo não existe!");
       
        expect(findTokenId).toHaveBeenCalledWith("valid-token");
        expect(vehiclesRepositoryMock.remove).not.toHaveBeenCalled();
    })

})