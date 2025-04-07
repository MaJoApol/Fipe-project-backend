import AppError from "./AppError";

export default class ItDoesntExistError extends AppError{
    constructor(field: string, context: string){
        const message = `${field} não existe. `
        super(message, 400, context)
    }
}

