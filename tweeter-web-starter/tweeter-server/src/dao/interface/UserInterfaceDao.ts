import {GetUserResponse, LoginResponse, RegisterResponse} from "tweeter-shared";

export interface UserDao {
    login(
        alias: string,
        password: string
    ): Promise<LoginResponse>;

    register(
        fistName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<RegisterResponse>;

    getUser(
        alias: string,
    ): Promise<GetUserResponse>;

}