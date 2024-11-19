import {UserService} from "../model/service/UserService";
import {AuthToken, User} from "tweeter-shared";

export interface UserView {
    displayErrorMessage: (message: string) => void;
    displayInfoMessage: (
        message: string,
        duration: number,
        bootstrapClasses?: string
    ) => void;
    clearLastInfoMessage: () => void;
    setIsFollower: (isFollower: boolean) => void;
    setFolloweeCount: (count: number) => void;
    setFollowerCount: (count: number) => void;
    setDisplayedUser: (user: User) => void;

}

export class UserPresenter {
    private view: UserView;
    private service: UserService;
    private isLoading = false;


    constructor(view: UserView) {
        this.view = view;
        this.service = new UserService();
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        try {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false);
            } else {
                this.view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                );
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to determine follower status because of exception: ${error}`
            );
        }
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ) {
        try {
            this.view.setFolloweeCount(await this.service.getFolloweeCount(authToken, displayedUser));
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get followees count because of exception: ${error}`
            );
        }
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ) {
        try {
            this.view.setFollowerCount(await this.service.getFollowerCount(authToken, displayedUser));
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get followers count because of exception: ${error}`
            );
        }
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

    public async unfollowDisplayedUser  (
        displayedUser: User,
        authToken: AuthToken
    ): Promise<void>  {

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