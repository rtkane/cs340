import {TweeterResponse} from "./TweeterResponse";

export interface UnfollowResponse extends TweeterResponse{
    readonly followerCount: number,
    readonly followingCount: number
}