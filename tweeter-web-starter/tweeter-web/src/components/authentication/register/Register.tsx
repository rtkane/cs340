import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useInfoHook from "../../userInfo/userInfoHook";
import {RegisterPresenter, RegisterView} from "../../../presenters/RegisterPresenter";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");
    const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array());
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageFileExtension, setImageFileExtension] = useState<string>("");
    const [rememberMe, setRememberMe] = useState(false);
    const {updateUserInfo} = useInfoHook();
    const {displayErrorMessage} = useToastListener();
    const [isLoading, setIsLoading] = useState(false);

    const checkSubmitButtonStatus = (): boolean => {
        return (
            !firstName ||
            !lastName ||
            !alias ||
            !password ||
            !imageUrl ||
            !imageFileExtension
        );
    };

    const registerOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key == "Enter" && !checkSubmitButtonStatus()) {
            doRegister();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        handleImageFile(file);
    };

    const handleImageFile = (file: File | undefined) => {
        presenter.handleImageFile(file);
    };


    const listener: RegisterView = {
        displayErrorMessage: displayErrorMessage,
        updateUserInfo: updateUserInfo,
    }

    const presenter = new RegisterPresenter(listener);


    const doRegister = async () => {
        await presenter.doRegister(firstName, lastName, alias, password, imageBytes, imageFileExtension, rememberMe);
    };


    const inputFieldGenerator = () => {
        return (
            <>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        size={50}
                        id="firstNameInput"
                        placeholder="First Name"
                        onKeyDown={registerOnEnter}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label htmlFor="firstNameInput">First Name</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        size={50}
                        id="lastNameInput"
                        placeholder="Last Name"
                        onKeyDown={registerOnEnter}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <label htmlFor="lastNameInput">Last Name</label>
                </div>
                <AuthenticationFields setAlias={(event) => setAlias(event.target.value)}
                                      setPassword={(event) => setPassword(event.target.value)}/>
                <div className="form-floating mb-3">
                    <input
                        type="file"
                        className="d-inline-block py-5 px-4 form-control bottom"
                        id="imageFileInput"
                        onKeyDown={registerOnEnter}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="imageFileInput">User Image</label>
                    <img src={imageUrl} className="img-thumbnail" alt=""></img>
                </div>
            </>
        );
    };

    const switchAuthenticationMethodGenerator = () => {
        return (
            <div className="mb-3">
                Algready registered? <Link to="/login">Sign in</Link>
            </div>
        );
    };

    return (
        <AuthenticationFormLayout
            headingText="Please Register"
            submitButtonLabel="Register"
            oAuthHeading="Register with:"
            inputFieldGenerator={inputFieldGenerator}
            switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
            setRememberMe={setRememberMe}
            submitButtonDisabled={checkSubmitButtonStatus}
            isLoading={isLoading}
            submit={doRegister}
        />
    );
};

export default Register;
