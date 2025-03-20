
import { verify } from "jsonwebtoken";
import auth from "../config/auth";

export function findTokenId(authHeader: string | any){

    if (!authHeader){
        throw new Error("Token Missing");
    }
    const [, token] =  authHeader.split(" ");
    try {
        const { sub: userId } = verify(token, auth.secret_token) as {sub: string};

        return userId
        
    } catch (error: any) {
        return error
    }

}