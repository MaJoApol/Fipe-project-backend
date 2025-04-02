export default class AppError extends Error {
    statusCode: number;
    context?: string;

    constructor(message: string, statusCode: number, context: string){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode
        this.context = context;

        Error.captureStackTrace(this, this.constructor) // para anter a referencia correta da classe
    }

    toJSON() {
        return{
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            context: this.context
        }
    }
}

