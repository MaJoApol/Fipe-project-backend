import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { hash } from "bcrypt";
import { findTokenId } from "../../../../utils/findTokenId";
import { NormalizeError, PageNotFoundError } from "next/dist/shared/lib/utils";
import { UsersDTO } from "../../dtos/UsersDTO";
import AlredyExistsError from "../../../../shared/infra/http/errs/AlreadyExistError";


@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(data: CreateUserDTO, tokenId?: string) : Promise<UsersDTO> {
        
        const existingUser = await this.usersRepository.findExistingUsers(data)
        if (existingUser.length > 0) {
            throw new AlredyExistsError("User")
        }

        const passwordHash = await hash(data.password, 13)

        const createUser: CreateUserDTO = {
            name: data.name,
            birthdate: data.birthdate,
            contact: data.contact,
            nationalId: data.nationalId,
            email: data.email,
            password: passwordHash
        }

        if (tokenId !== '') {
            const creatorId = findTokenId(tokenId);
            createUser.createdById = creatorId;
        }

        return await this.usersRepository.create(createUser);
    }

}