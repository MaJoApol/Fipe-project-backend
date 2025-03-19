import { Users } from "@prisma/client";
import { UsersDTO } from "./UsersDTO";

export interface CreateUserDTO extends Pick<UsersDTO, "name" | "email" | "birthdate" | "contact" | "password" | "nationalId" | "token"> {}