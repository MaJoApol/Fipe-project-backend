class AppError extends Error {
    statusCode: number;
    context?: Record<string, any>

    constructor(message: string, statusCode: number, context?: Record<string, any>){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.context = context;

        Error.captureStackTrace(this, this.constructor) // para anter a referencia correta da classe
    }
}

class AlredyExistsError extends AppError{
    constructor(field: string, message =  `${field} já existe.`){
        super(message, 409, {field})
    }
}

export default AlredyExistsError;
export { AppError };