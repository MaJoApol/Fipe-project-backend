
import "reflect-metadata";
import { describe } from "node:test";
import { headers } from "next/headers";
import { container } from "tsyringe";

describe("Create Brands Controller", () => {
    let createBrandUseCaseMock;
    let createBrandController;
    let request;
    let response;

    beforeEach(()=>{
        createBrandUseCaseMock = {
            execute: jest.fn()
        };

        jest.spyOn(container, "resolve").mockReturnValue(createBrandUseCaseMock);

        request = {
            body: {name: "Teste"},
            headers: { authorization: "token123"}
        }

        response = {
            status: jest.fn(),
            json: jest.fn()
        }



        


    })






})