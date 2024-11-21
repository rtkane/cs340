import {UserService} from "../model/service/UserService";
import {AuthToken, User} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";

export interface UserView extends MessageView {
    setIsFollower: (isFollower: boolean) => void;
    setFolloweeCount: (count: number) => void;
    setFollowerCount: (count: number) => void;
    setDisplayedUser: (user: User) => void;
}

export class UserPresenter extends Presenter<UserView> {
    private service: UserService;


    constructor(view: UserView) {
        super(view);
        this.service = new UserService();
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        this.doFailureReportingOperation("determine follower status", async () => {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false);
            } else {
                this.view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                );
            }
        })
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ) {
        this.doFailureReportingOperation("get followees count ", async () => {
            this.view.setFolloweeCount(await this.service.getFolloweeCount(authToken, displayedUser));
        })
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ) {
        this.doFailureReportingOperation("get followers count", async () => {
            this.view.setFollowerCount(await this.service.getFollowerCount(authToken, displayedUser));

        })
    };

    public switchToLoggedInUser = (currentUser: User): void => {
        this.view.setDisplayedUser(currentUser!);
    };

    public async followDisplayedUser(
        displayedUser: User,
        authToken: AuthToken
    ): Promise<void> {

        try {
            this.isLoading = true;
            this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);

            const [followerCount, followeeCount] = await this.service.follow(
                authToken!,
                displayedUser!
            );

            this.view.setIsFollower(true);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to follow user because of exception: ${error}`
            );
        } finally {
            this.view.clearLastInfoMessage();
            this.isLoading = false;
        }
    };

    public async unfollowDisplayedUser(
        displayedUser: User,
        authToken: AuthToken
    ): Promise<void> {

        try {
            this.isLoading = true;
            this.view.displayInfoMessage(
                `Unfollowing ${displayedUser!.name}...`,
                0
            );

            const [followerCount, followeeCount] = await this.service.unfollow(
                authToken!,
                displayedUser!
            );

            this.view.setIsFollower(false);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to unfollow user because of exception: ${error}`
            );
        } finally {
            this.view.clearLastInfoMessage();
            this.isLoading = false;
        }
    };
}