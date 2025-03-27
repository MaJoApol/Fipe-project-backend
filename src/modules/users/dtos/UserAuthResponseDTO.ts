import { UsersDTO } from "./UsersDTO";

export interface UserAuthResponseDTO {
    user: UsersDTO;
    token: string;
    refreshToken: string;
    tokenTime: number;
}
