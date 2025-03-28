
import { verify } from "jsonwebtoken";
import auth from "../config/auth";

export function findTokenId(authHeader: string | any){

    if (!authHeader){
        throw new Error("Token Missing");
    }
    const [, token] =  authHeader.split(" ");

    try {
        const { id: userId } = verify(token, auth.secret_token) as {id: string};

        return userId
        
    } catch (error: any) {
        return error
    }

}
