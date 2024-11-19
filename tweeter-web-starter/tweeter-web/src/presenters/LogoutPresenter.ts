import {UserService} from "../model/service/UserService";
import {AuthToken} from "tweeter-shared";

export interface LogoutView {
    displayErrorMessage: (message: string) => void;
    displayInfoMessage: (
        message: string,
        duration: number,
        bootstrapClasses?: string
    ) => void;
    clearLastInfoMessage: () => void;
    clearUserInfo: () => void;


}

export class LogoutPresenter {
    private view: LogoutView;
    private logoutService: UserService;

    public constructor(view: LogoutView) {
        this.view = view;
        this.logoutService = new UserService();
    }

    public async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage("Logging Out...", 0);

        try {
            await this.logoutService.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user out because of exception: ${error}`
            );
        }
    };


}