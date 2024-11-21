import {UserService} from "../model/service/UserService";
import {AuthToken} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";

export interface LogoutView extends MessageView {
    clearUserInfo: () => void;
}

export class AppNavbarPresenter extends Presenter<LogoutView>{
    private logoutService: UserService;

    public constructor(view: LogoutView) {
        super(view);
        this.logoutService = new UserService();
    }

    public async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation("log user out", async () => {
            await this.logoutService.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        })
    };
}