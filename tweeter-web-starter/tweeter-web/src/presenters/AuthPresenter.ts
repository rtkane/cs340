import {Presenter, View} from "./Presenter";
import {AuthToken, User} from "tweeter-shared";


export interface UserView extends View {
    updateUserInfo: (
        user: User,
        displayedUser: User | null,
        authToken: AuthToken,
        rememberMe: boolean
    ) => void;
    navigate: (path: string) => void;
}

export class AuthPresenter extends Presenter<UserView> {

    public async doUserAuthOperation(
        operationDescription: string,
        authOperation: () => Promise<[User, AuthToken]>,
        onSuccess: (user: User, authToken: AuthToken) => void,
        rememberMe: boolean,
        navigatePath: string
    ): Promise<void> {
        try {
            this.isLoading = true;
            const [user, authToken] = await authOperation();
            this.view.updateUserInfo(user, user, authToken, rememberMe);
            onSuccess(user, authToken);
            this.view.navigate(navigatePath);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to ${operationDescription} because of exception: ${error}`
            );
        } finally {
            this.isLoading = false;
        }
    }
}
