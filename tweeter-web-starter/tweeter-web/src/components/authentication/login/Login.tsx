import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useInfoHook from "../../userInfo/userInfoHook";
import {LoginPresenter, LoginView} from "../../../presenters/LoginPresenter";

interface Props {
    originalUrl?: string;
}

const Login = (props: Props) => {
    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const {updateUserInfo} = useInfoHook();
    const {displayErrorMessage} = useToastListener();

    const checkSubmitButtonStatus = (): boolean => {
        return !alias || !password;
    };

    const listener: LoginView = {
        displayErrorMessage: displayErrorMessage,
        updateUserInfo: updateUserInfo,
        navigate: () => {
            if (!!props.originalUrl) {
                navigate(props.originalUrl);
            } else {
                navigate("/");
            }
        }
    }

    const presenter = new LoginPresenter(listener);

    const doLogin = async () => {
        await presenter.doLogin(alias, password, rememberMe);
    };

    const inputFieldGenerator = () => {
        return (
            <AuthenticationFields setAlias={(event) => setAlias(event.target.value)}
                                  setPassword={(event) => setPassword(event.target.value)}/>
        );
    };

    const switchAuthenticationMethodGenerator = () => {
        return (
            <div className="mb-3">
                Not registered? <Link to="/register">Register</Link>
            </div>
        );
    };

    return (
        <AuthenticationFormLayout
            headingText="Please Sign In"
            submitButtonLabel="Sign in"
            oAuthHeading="Sign in with:"
            inputFieldGenerator={inputFieldGenerator}
            switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
            setRememberMe={setRememberMe}
            submitButtonDisabled={checkSubmitButtonStatus}
            isLoading={isLoading}
            submit={doLogin}
        />
    );
};

export default Login;
