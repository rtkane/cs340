import {
    FollowCountRequest,
    FollowCountResponse,
    FollowRequest,
    FollowResponse,
    GetIsFollowerStatusRequest,
    GetIsFollowerStatusResponse,
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    LogoutResponse,
    PagedStatusItemRequest,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    PostStatusRequest,
    PostStatusResponse,
    RegisterRequest,
    RegisterResponse,
    UnfollowRequest,
    UnfollowResponse,
} from "tweeter-shared";
import {ClientCommunicator} from "./ClientCommunicator";

export class ServerFacade {
    private SERVER_URL = "https://2xkdmscck8.execute-api.us-west-2.amazonaws.com/dev";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    async login(request: LoginRequest): Promise<LoginResponse> {
        const endpoint = "/login";
        const response = await this.clientCommunicator.doPost<
            LoginRequest,
            LoginResponse
        >(request, endpoint);
        return response;
    }

    async register(request: RegisterRequest): Promise<RegisterResponse> {
        const endpoint = "/register";
        const response = await this.clientCommunicator.doPost<
            RegisterRequest,
            RegisterResponse
        >(request, endpoint);
        return response;
    }

    async logout(request: LogoutRequest): Promise<LogoutResponse> {
        const endpoint = "/logout";
        const response = await this.clientCommunicator.doPost<
            LogoutRequest,
            LogoutResponse
        >(request, endpoint);
        return response;
    }

    async loadMoreFollowers(request: PagedUserItemRequest): Promise<PagedUserItemResponse> {
        const endpoint = "/follower/list"
        const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest,
            PagedUserItemResponse
        >(request, endpoint);
        return response;
    }

    async loadMoreFollowees(request: PagedUserItemRequest): Promise<PagedUserItemResponse> {
        const endpoint = "/followee/list"
        const response = await this.clientCommunicator.doPost<
            PagedUserItemRequest,
            PagedUserItemResponse
        >(request, endpoint);
        return response;
    }

    async loadMoreStory(request: PagedStatusItemRequest): Promise<PagedStatusItemResponse> {
        const endpoint = "/story/list"
        const response = await this.clientCommunicator.doPost<
            PagedStatusItemRequest,
            PagedStatusItemResponse
        >(request, endpoint);
        return response;
    }

    async loadMoreFeed(request: PagedStatusItemRequest): Promise<PagedStatusItemResponse> {
        const endpoint = "/feed/list"
        const response = await this.clientCommunicator.doPost<
            PagedStatusItemRequest,
            PagedStatusItemResponse
        >(request, endpoint);
        return response;
    }

    async getIsFollowerStatus(request: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse>{
        const endpoint = "/follower/status"
        const response = await this.clientCommunicator.doPost<
            GetIsFollowerStatusRequest,
            GetIsFollowerStatusResponse
        >
        (request, endpoint);
        return response;
    }

    async getFolloweeCount(request: FollowCountRequest): Promise<FollowCountResponse>{
        const endpoint = "/followee/count"
        const response = await this.clientCommunicator.doPost<
            FollowCountRequest,
            FollowCountResponse
        >
        (request, endpoint);
        return response;
    }

    async getFollowerCount(request: FollowCountRequest): Promise<FollowCountResponse>{
        const endpoint = "/follower/count"
        const response = await this.clientCommunicator.doPost<
            FollowCountRequest,
            FollowCountResponse
        >
        (request, endpoint);
        return response;
    }

    async follow(request: FollowRequest): Promise<FollowResponse>{
        const endpoint = "/follower/follow"
        const response = await this.clientCommunicator.doPost<
            FollowRequest,
            FollowResponse
        >
        (request, endpoint);
        return response;
    }


    async unfollow(request: UnfollowRequest): Promise<UnfollowResponse>{
        const endpoint = "/unfollow"
        const response = await this.clientCommunicator.doPost<
            UnfollowRequest,
            UnfollowResponse
        >
        (request, endpoint);
        return response;
    }

    async post(request: PostStatusRequest): Promise<PostStatusResponse>{
        const endpoint = "/status/list"
        const response = await this.clientCommunicator.doPost<
            PostStatusRequest,
            PostStatusResponse
        >
        (request, endpoint);
        return response;
    }

}