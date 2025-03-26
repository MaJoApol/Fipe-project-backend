
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { UsersDTO } from "../dtos/UsersDTO";


export interface IUsersRepository {
    create(data: CreateUserDTO): Promise<UsersDTO>;
    update(data: UpdateUserDTO): Promise<UsersDTO>;
    list(page: number, pageSize: number): Promise<UsersDTO[]>;
    remove(id: string, performer: string): Promise<void>;
    findById(id: string): Promise<UsersDTO | null>;
    findExistingUsers(data: CreateUserDTO): Promise<UsersDTO[]>;
    findByEmail(email: string): Promise<UsersDTO>;
    updateToken(id: string, token: string): Promise<UsersDTO>;
}
