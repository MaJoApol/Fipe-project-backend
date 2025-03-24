import { Users } from "@prisma/client";


export interface CreateUserDTO extends Pick<Users, "name" | "email" | "birthdate" | "contact" | "password" | "nationalId" >
{
    createdById?: string;
}