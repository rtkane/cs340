import {AuthToken, UserDto} from "tweeter-shared";

export interface AuthTokenDao {
    createAuthToken(
        authToken: AuthToken,
        user: UserDto
    ): Promise<void>

    getAuthToke(
        authToken: AuthToken,
    ): Promise<boolean>

    clearAuthToken(
        authToken: AuthToken,
    ): Promise<void>

}