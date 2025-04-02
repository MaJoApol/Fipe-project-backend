import AppError from "./AppError";

export default class AlredyExistsError extends AppError{
    constructor(field: string, context: string){
        const message = `${field} já existe. `
        super(message, 409, context)
    }
}

