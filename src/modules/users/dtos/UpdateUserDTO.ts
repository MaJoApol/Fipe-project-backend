import { UsersDTO } from "./UsersDTO";

export interface UpdateUserDTO extends Pick<UsersDTO, "id" | "name" | "birthdate" | "email" | "nationalId" | "contact" | "updatedAt">{
    updatedBy?: string;
    password?: string;
}