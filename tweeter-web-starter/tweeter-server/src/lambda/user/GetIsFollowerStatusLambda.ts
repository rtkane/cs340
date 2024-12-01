import {GetIsFollowerStatusRequest, GetIsFollowerStatusResponse, LogoutRequest, LogoutResponse} from "tweeter-shared";
import {UserService} from "../../model/service/UserService";

export const handler = async (request: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    const userService = new UserService();
    const status = await userService.getIsFollowerStatus(request.token, request.user, request.selectedUser);

    return{
        success: true,
        message: null,
        status: status
    }

}