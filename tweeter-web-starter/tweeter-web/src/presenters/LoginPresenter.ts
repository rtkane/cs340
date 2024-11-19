import {UserService} from "../model/service/UserService";
import {AuthToken, User} from "tweeter-shared";

export interface LoginView{
    displayErrorMessage: (message: string) => void;
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;
    navigate: () => void;
}

export class LoginPresenter {
    private view: LoginView;
    private loginService: UserService;
    private isLoading = false;

    public constructor(view: LoginView) {
        this.view = view;
        this.loginService = new UserService();
    }

    public async doLogin(alias: string, password: string, rememberMe: boolean){
        try {
            this.isLoading = true;
            const [user, authToken] = await this.loginService.login(alias, password);
            this.view.updateUserInfo(user, user, authToken, rememberMe);
            this.view.navigate();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user in because of exception: ${error}`
            );
        } finally {
            this.isLoading  = false;
        }
    };
}