
import { verify } from "jsonwebtoken";
import auth from "../config/auth";

export function findTokenId(authHeader: string | undefined) {
    
    console.log(    "inside funcioTION", authHeader)
    if (!authHeader){
        throw new Error("Token Missing");
    }
    console.log(    "inside funcioTION 2")
    const [, token] =  authHeader.split(" ");
    console.log(    "inside funcioTION 2",token)
    console.log(token)
    try {
        const { id: userId } = verify(token, auth.secret_token) as {id: string};
        console.log(    "inside funcioTION ID", userId)
        return userId
        
    } catch (error) {
        console.log("ERROR A        QUI", error)
        return "error"
    }

}