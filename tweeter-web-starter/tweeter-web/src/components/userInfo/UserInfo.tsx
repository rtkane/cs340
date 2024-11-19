import "./UserInfo.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthToken, FakeData, User} from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useInfoHook from "./userInfoHook";
import {UserPresenter, UserView} from "../../presenters/UserPresenter";

const UserInfo = () => {
    const [isFollower, setIsFollower] = useState(false);
    const [followeeCount, setFolloweeCount] = useState(-1);
    const [followerCount, setFollowerCount] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    const {displayErrorMessage, displayInfoMessage, clearLastInfoMessage} =
        useToastListener();

    const {currentUser, authToken, displayedUser, setDisplayedUser} =
        useInfoHook();

    if (!displayedUser) {
        setDisplayedUser(currentUser!);
    }

    useEffect(() => {
        setIsFollowerStatus(authToken!, currentUser!, displayedUser!);
        setNumbFollowees(authToken!, displayedUser!);
        setNumbFollowers(authToken!, displayedUser!);
    }, [displayedUser]);

    const listener: UserView = {
        displayErrorMessage: displayErrorMessage,
        displayInfoMessage: displayInfoMessage,
        clearLastInfoMessage: clearLastInfoMessage,
        setIsFollower: setIsFollower,
        setFolloweeCount: setFolloweeCount,
        setDisplayedUser: setDisplayedUser,
        setFollowerCount: setFollowerCount,
    }

    const presenter = new UserPresenter(listener)

    const setIsFollowerStatus = (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) => {
        presenter.setIsFollowerStatus(authToken, currentUser, displayedUser);
    };


    const setNumbFollowees = async (
        authToken: AuthToken,
        displayedUser: User
    ) => {
        presenter.setNumbFollowees(authToken, displayedUser!);
    };


    const setNumbFollowers = async (
        authToken: AuthToken,
        displayedUser: User
    ) => {
        presenter.setNumbFollowers(authToken, displayedUser!);
    };


    const switchToLoggedInUser = (event: React.MouseEvent): void => {
        event.preventDefault();
        presenter.switchToLoggedInUser(currentUser!);
    };

    const followDisplayedUser = async (
        event: React.MouseEvent,
    ): Promise<void> => {
        event.preventDefault();
        await presenter.followDisplayedUser(displayedUser!, authToken!);
    };


    const unfollowDisplayedUser = async (
        event: React.MouseEvent
    ): Promise<void> => {
        event.preventDefault();
        presenter.unfollowDisplayedUser(displayedUser!, authToken!)
    };


    return (
        <div className={isLoading ? "loading" : ""}>
            {currentUser === null || displayedUser === null || authToken === null ? (
                <></>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-auto p-3">
                            <img
                                src={displayedUser.imageUrl}
                                className="img-fluid"
                                width="100"
                                alt="Posting user"
                            />
                        </div>
                        <div className="col p-3">
                            {displayedUser !== currentUser && (
                                <p id="returnToLoggedInUser">
                                    Return to{" "}
                                    <Link
                                        to={""}
                                        onClick={(event) => switchToLoggedInUser(event)}
                                    >
                                        logged in user
                                    </Link>
                                </p>
                            )}
                            <h2>
                                <b>{displayedUser.name}</b>
                            </h2>
                            <h3>{displayedUser.alias}</h3>
                            <br/>
                            {followeeCount > -1 && followerCount > -1 && (
                                <div>
                                    Followees: {followeeCount} Followers: {followerCount}
                                </div>
                            )}
                        </div>
                        <form>
                            {displayedUser !== currentUser && (
                                <div className="form-group">
                                    {isFollower ? (
                                        <button
                                            id="unFollowButton"
                                            className="btn btn-md btn-secondary me-1"
                                            type="submit"
                                            style={{width: "6em"}}
                                            onClick={(event) => unfollowDisplayedUser(event)}
                                        >
                                            {isLoading ? (
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                            ) : (
                                                <div>Unfollow</div>
                                            )}
                                        </button>
                                    ) : (
                                        <button
                                            id="followButton"
                                            className="btn btn-md btn-primary me-1"
                                            type="submit"
                                            style={{width: "6em"}}
                                            onClick={(event) => followDisplayedUser(event)}
                                        >
                                            {isLoading ? (
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                            ) : (
                                                <div>Follow</div>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
