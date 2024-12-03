import {User} from "../domain/User";
import {PostSegment} from "../domain/PostSegment";
import {UserDto} from "./UserDto";

export interface StatusDto {
    readonly post: string;
    readonly user: UserDto;
    readonly timestamp: number;
    readonly segments: PostSegment[];

}