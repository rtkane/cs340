import {
    AuthToken,
    FollowCountRequest,
    FollowCountResponse,
    FollowRequest, FollowResponse,
    GetIsFollowerStatusRequest,
    GetIsFollowerStatusResponse, GetUserRequest, GetUserResponse,
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    LogoutResponse,
    RegisterRequest,
    RegisterResponse, UnfollowRequest, UnfollowResponse,
    User
} from "tweeter-shared";
import {ServerFacade} from "../../network/ServerFacade";

export class UserService {
    private serverFacade = new ServerFacade();


    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        const loginRequest: LoginRequest = {alias, password};

        const loginResponse: LoginResponse = await this.serverFacade.login(
            loginRequest
        );

        const user = User.fromDto(loginResponse.items)

        return [user!, new AuthToken(loginResponse.token, 1)];

    }

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[User, AuthToken]> {
        const registerRequest: RegisterRequest = {
            firstName, lastName,
            alias, password, userImageBytes, imageFileExtension
        };

        const registerResponse: RegisterResponse = await this.serverFacade.register(
            registerRequest
        );

        const user = User.fromDto(registerResponse.items)

        return [user!, new AuthToken(registerResponse.token, 1)];
    };

    public async logout(authToken: AuthToken): Promise<void> {
        const logoutRequest: LogoutRequest = {token: authToken.token};
        const logoutResponse: LogoutResponse = await this.serverFacade.logout(logoutRequest);

    };

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        const getIsFollowerStatusRequest: GetIsFollowerStatusRequest = {
            token: authToken.token,
            user: user.dto,
            selectedUser: selectedUser.dto,
        }

        const getIsFollowerStatusResponse: GetIsFollowerStatusResponse =
            await this.serverFacade.getIsFollowerStatus(getIsFollowerStatusRequest);

        return getIsFollowerStatusResponse.status;
    };

    public async getFolloweeCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        const getFolloweeCountRequest: FollowCountRequest = {
            token: authToken.token,
            user: user.dto,
        }

        const getFolloweeCountResponse: FollowCountResponse =
            await this.serverFacade.getFolloweeCount(getFolloweeCountRequest);

        return getFolloweeCountResponse.count
    };

    public async getFollowerCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        const getFolloweeCountRequest: FollowCountRequest = {
            token: authToken.token,
            user: user.dto,
        }

        const getFolloweeCountResponse: FollowCountResponse =
            await this.serverFacade.getFolloweeCount(getFolloweeCountRequest);

        return getFolloweeCountResponse.count
    };

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        const followRequest: FollowRequest = {
            token: authToken.token,
            userToFollow: userToFollow.dto,
        }

        const followResponse: FollowResponse =
            await this.serverFacade.follow(followRequest);

        return [followResponse.followerCount, followResponse.followeeCount];
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        const unfollowRequest: UnfollowRequest = {
            authToken: authToken.token,
            userToUnfollow: userToUnfollow.dto,
        }

        const unfollowResponse: UnfollowResponse =
            await this.serverFacade.unfollow(unfollowRequest);

        return [unfollowResponse.followerCount, unfollowResponse.followingCount];
    };

    public async getUser  (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        const getUserRequest: GetUserRequest = {
            token: authToken.token,
            alias: alias
        }

        const getUserResponse: GetUserResponse =
            await this.serverFacade.getUser(getUserRequest);

        const user = User.fromDto(getUserResponse.user)

        return user
    };


}