import {UnfollowRequest, UnfollowResponse} from "tweeter-shared";
import {UserService} from "../../model/service/UserService";

export const handler = async (request: UnfollowRequest): Promise<UnfollowResponse> => {
    const userService = new UserService();
    const [followerCount, followingCount] = await userService.unfollow(request.authToken, request.userToUnfollow);

    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followingCount: followingCount
    }

}