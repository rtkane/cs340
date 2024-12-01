import {LoginRequest, LoginResponse} from "tweeter-shared";
import {UserService} from "../../model/service/UserService";

export const handler = async (request: LoginRequest): Promise<LoginResponse> => {
    const userService = new UserService();
    const [item, token] = await userService.login(request.alias, request.password);
    return {
        success: true,
        message: null,
        items: item,
        token: token
    }

}