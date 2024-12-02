import {ServerFacade} from "../../src/network/ServerFacade";
import {
    User,
    RegisterRequest,
    RegisterResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    FollowCountRequest, FollowCountResponse
} from "tweeter-shared";

describe("ServerFacade Integration Tests", () => {
    let serverFacade: ServerFacade;
    let mockUser: User;

    beforeEach(() => {
        serverFacade = new ServerFacade();
        mockUser = new User(
            "Allen",
            "Anderson",
            "@allen",
            "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
        );
    });

    test("Register", async () => {
        const registerRequest: RegisterRequest = {
            firstName: "Allen",
            lastName: "Anderson",
            alias: "@allen",
            password: "password",
            userImageBytes: new Uint8Array(0),
            imageFileExtension: "png",
        };

        const mockRegisterResponse: RegisterResponse = {
            success: true,
            message: null,
            items: mockUser.dto,
            token: "RYAN",
        };

        const doPostMock = jest.spyOn(serverFacade["clientCommunicator"], "doPost");
        doPostMock.mockResolvedValueOnce(mockRegisterResponse);

        const registerResponse = await serverFacade.register(registerRequest);

        expect(registerResponse.success).toBe(true);
        expect(registerResponse.items).toBeDefined();
        expect(registerResponse.token).toBe("RYAN");
        expect(registerResponse.items?.firstName).toBe("Allen");
        expect(registerResponse.items?.lastName).toBe("Anderson");
        expect(registerResponse.items?.alias).toBe("@allen");
        expect(registerResponse.items?.imageURL).toBe(mockUser.imageUrl);
    });

    test("GetFollowers", async () => {
        const request: PagedUserItemRequest = {
            token: "RYAN",
            userAlias: "@allen",
            pageSize: 10,
            lastItem: null,
        };

        const mockGetFollowersResponse: PagedUserItemResponse = {
            success: true,
            message: null,
            items: [mockUser.dto],
            hasMore: false,
        };

        const doPostMock = jest.spyOn(serverFacade["clientCommunicator"], "doPost");
        doPostMock.mockResolvedValueOnce(mockGetFollowersResponse);

        const followersResponse = await serverFacade.loadMoreFollowers(request);


        expect(followersResponse.success).toBe(true);
        expect(followersResponse.items).toBeDefined();
        expect(followersResponse.items?.length).toBeGreaterThan(0);
        expect(followersResponse.hasMore).toBe(false);
    });

    test("GetFolloweeCount", async () => {
        const request: FollowCountRequest = {
            token: "RYAN",
            user: mockUser.dto,
        };

        const mockGetFollowingCountResponse: FollowCountResponse = {
            success: true,
            message: null,
            count: 8,
        };

        const doPostMock = jest.spyOn(serverFacade["clientCommunicator"], "doPost");
        doPostMock.mockResolvedValueOnce(mockGetFollowingCountResponse);

        const followingCountResponse = await serverFacade.getFolloweeCount(request);

        expect(followingCountResponse.success).toBe(true);
        expect(followingCountResponse.count).toBe(8);
    });

});
