import {AuthToken, Status} from "tweeter-shared";
import {DataPage} from "../entity/DataPage";
import {Post} from "../entity/Post";

export interface StatusDao {
    postStatusStory(authToken: AuthToken, status: Status): Promise<void>;
    postStatusFeed(recieverAlias: string[], status: Status): Promise<void>;
    getPageOfStories(
        alias: string,
        pageSize: number,
        lastItemTime: number | undefined
    ): Promise<DataPage<Post>>;
    getPageOfFeed(
        alias: string,
        pageSize: number,
        lastItemTime: number | undefined
    ): Promise<DataPage<Post>>;

}