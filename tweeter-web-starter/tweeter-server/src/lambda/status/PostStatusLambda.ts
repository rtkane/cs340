import {PostStatusRequest, PostStatusResponse} from "tweeter-shared";
import {StatusService} from "../../model/service/StatusService";

export const handler = async (request: PostStatusRequest): Promise<PostStatusResponse> => {
    const statusService = new StatusService();

    const response = statusService.postStatus(request.token, request.newStatus)

    return {
        success: true,
        message: null,
    }

}