import {UserDto} from "../../dto/UserDto";

export interface UnfollowRequest{
    readonly authToken: string,
    readonly  userToUnfollow: UserDto
}