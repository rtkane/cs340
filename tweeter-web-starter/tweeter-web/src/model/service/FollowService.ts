import {AuthToken, PagedUserItemRequest, PagedUserItemResponse, User} from "tweeter-shared";
import {ServerFacade} from "../../network/ServerFacade";

export class FollowService {
    private serverFacade = new ServerFacade();



    public async loadMoreFollowers(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        const lastItemDto = lastItem ? lastItem.dto : null;
        const token: string  = authToken.token
        const request: PagedUserItemRequest = {
            token: token,
            userAlias,
            pageSize,
            lastItem: lastItemDto,
        };

        const response: PagedUserItemResponse = await this.serverFacade.loadMoreFollowers(request);
        const users = response.items!.map(User.fromDto).filter((user): user is User => user !== null);

        return [users, response.hasMore];
    }

    public async loadMoreFollowees(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        const lastItemDto = lastItem ? lastItem.dto : null;
        const token: string  = authToken.token
        const request: PagedUserItemRequest = {
            token: token,
            userAlias,
            pageSize,
            lastItem: lastItemDto,
        };

        const response: PagedUserItemResponse = await this.serverFacade.loadMoreFollowees(request);
        const users = response.items!.map(User.fromDto).filter((user): user is User => user !== null);

        return [users, response.hasMore];
    };





}