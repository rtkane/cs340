import {
    AuthToken,
    PagedStatusItemRequest,
    PagedStatusItemResponse,
    PostStatusRequest,
    PostStatusResponse,
    Status
} from "tweeter-shared";
import {ServerFacade} from "../../network/ServerFacade";

export class StatusService {
    private serverFacade = new ServerFacade();


    public async loadMoreStoryItems(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        const lastItemDto  = lastItem ? lastItem.dto : null;
        const token:string  = authToken.token
        const request: PagedStatusItemRequest = {
            token: token,
            userAlias,
            pageSize,
            lastItem: lastItemDto,
        }
        const response: PagedStatusItemResponse = await this.serverFacade.loadMoreStory(request);
        const status = response.items!.map(Status.fromDto).filter((status): status is Status => status !== null);

        return[status, response.hasMore]
    };

    public async loadMoreFeedItems(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        const lastItemDto  = lastItem ? lastItem.dto : null;
        const token:string  = authToken.token
        const request: PagedStatusItemRequest = {
            token: token,
            userAlias,
            pageSize,
            lastItem: lastItemDto,
        }
        const response: PagedStatusItemResponse = await this.serverFacade.loadMoreFeed(request);
        const status = response.items!.map(Status.fromDto).filter((status): status is Status => status !== null);

        return[status, response.hasMore]
    };

    public async postStatus  (
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        const postStatusRequest: PostStatusRequest = {
            token: authToken.token,
            newStatus: newStatus.dto
        }

        const postStatusResponse: PostStatusResponse =
            await this.serverFacade.post(postStatusRequest);


    };
}