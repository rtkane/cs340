import {AuthToken} from "tweeter-shared";
import {DataPage} from "../entity/DataPage";
import {Follow} from "../entity/Follow";

export interface FollowDao {
    putFollow(follow: Follow): Promise<void>;
    getFollow(
        followerHandle: string,
        followeeHandle: string
    ): Promise<Follow | undefined>;
    updateFollow(
        followerHandle: string,
        followeeHandle: string,
        newFollower: string,
        newFollowee: string
    ): Promise<void>;
    deleteFollow(followerHandle: string, followeeHandle: string): Promise<void>;
    getPageOfFollowees(
        followerHandle: string,
        pageSize: number,
        lastFolloweeHandle: string | undefined
    ): Promise<DataPage<Follow>>;
    getPageOfFollowers(
        followeeHandle: string,
        pageSize: number,
        lastFollowerHandle: string | undefined
    ): Promise<DataPage<Follow>>;
    getFollowersCount(authToken: AuthToken, alias: string): Promise<number>;
    getFollowersAlias(authToken: AuthToken, alias: string): Promise<string[]>;
    getFolloweesCount(authToken: AuthToken, alias: string): Promise<number>;

}