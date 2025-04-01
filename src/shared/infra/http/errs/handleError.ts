import { NextFunction } from "express";
import { NextResponse } from "next/server";



export function handleError(
    err: Error
){
    console.error(`[${err.name}]: ${err.message}`);

    if (err instanceof AppError){
        return NextResponse.json({
            sucess:false,
            error: {
                name: err.name,
                message: err.message,
                statusCode: err.statusCode,
                context: err.context || null
            }
        });
    }

    NextResponse.json({
        success: false,
        error: {
          name: "InternalServerError",
          message: "Algo deu errado",
          statusCode: 500,
        },
      });

}