import { Response, Request, NextFunction } from "express";
import { UsersRepository } from "../../../../modules/users/infra/prisma/repositories/UsersRepository";
import { findTokenId } from "../../../../utils/findTokenId";

export async function ensureAunthenticated(request: Request, response: Response, next: NextFunction) {

    try {
        console.log("AAAAAAAAAAA")
        const userId = findTokenId(request.headers.authorization)
    
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(userId);
        if (user){
            next();
        }
        else{
            return response.status(401).json({message: "Usuário deslogado"})
        }
    } catch (error) {
        throw new Error("Invalid token!");
    }
}