import {RegisterRequest, RegisterResponse} from "tweeter-shared";
import {UserService} from "../../model/service/UserService";

export const handler = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const userService = new UserService();
    const [items, token] = await userService.register(request.firstName, request.lastName, request.alias, request.password, request.userImageBytes, request.imageFileExtension);

    return {
        success: true,
        message: null,
        items: items,
        token: token
    }

}