import {UserDto} from "../../dto/UserDto";

export interface FollowRequest {
    readonly token: string,
    readonly userToFollow: UserDto

}