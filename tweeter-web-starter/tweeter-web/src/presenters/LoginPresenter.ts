import {UserService} from "../model/service/UserService";
import {AuthPresenter, UserView} from "./AuthPresenter";

export interface LoginView extends UserView{
}

export class LoginPresenter extends AuthPresenter{
    private loginService: UserService;

    public constructor(view: LoginView) {
        super(view);
        this.loginService = new UserService();
    }

    public async doLogin(alias: string, password: string, rememberMe: boolean): Promise<void> {
        await this.doUserAuthOperation(
            "log user in",
            () => this.loginService.login(alias, password),
            (user, authToken) => {},
            rememberMe,
            "/"
        );
    }
}