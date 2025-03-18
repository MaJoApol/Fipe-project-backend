
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { UsersDTO } from "../dtos/UsersDTO";


export interface IUsersRepository {
    create(data: CreateUserDTO): Promise<UsersDTO>;
    update(data: UpdateUserDTO): Promise<UsersDTO>;
    list(data: {page: number}): Promise<UsersDTO[]>
    remove(id: string): Promise<void>;
    findById(id: string): Promise<UsersDTO>;
    findExistingUsers(data: CreateUserDTO): Promise<UsersDTO[]>
}
