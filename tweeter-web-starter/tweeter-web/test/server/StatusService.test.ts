import {
    AuthToken,
    User,
    Status, PagedStatusItemRequest,
} from "tweeter-shared";
import {StatusService} from "../../src/model/service/StatusService";
import {ServerFacade} from "../../src/network/ServerFacade";
import "isomorphic-fetch";


describe("StatusService loadMoreStoryItems Integration Test", () => {
    let authToken: AuthToken;
    let user: User;
    let pageSize: number;
    let lastItem: Status | null;

    beforeAll(() => {
        let serverFacade = new ServerFacade();

        authToken = new AuthToken("RYAN", 1);
        user = new User("Ryan", "Kane", "lol", "www.google.com/yoshi");
        pageSize = 10;
        lastItem = null;
    });

    it("Load Story Items Successfully", async () => {
        const statusService = new StatusService();
        let request: PagedStatusItemRequest = (
            {
                token: authToken.token,
                userAlias: user.alias,
                pageSize,
                lastItem
            }
        );
        const response = await statusService.loadMoreStoryItems(
            authToken,
            user.alias,
            pageSize,
            lastItem
        );

        expect(response[0].length).toEqual(10);
        expect(response[1]).toBeTruthy();
    });
});