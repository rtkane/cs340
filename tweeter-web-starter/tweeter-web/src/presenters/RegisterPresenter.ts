import {UserService} from "../model/service/UserService";
import {AuthToken, User} from "tweeter-shared";
import {useNavigate} from "react-router-dom";
import {Buffer} from "buffer";

export interface RegisterView {
    displayErrorMessage: (message: string) => void;
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;

}

export class RegisterPresenter {
    private view: RegisterView;
    private registerService: UserService;
    private isLoading = false;
    private navigate = useNavigate();
    private imageUrl: string = "";
    private imageBytes: Uint8Array = new Uint8Array();
    private imageFileExtension = "";


    public constructor(view: RegisterView) {
        this.view = view;
        this.registerService = new UserService();
    }

    public async doRegister(firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array, imageFileExtension: string, rememberMe: boolean) {
        try {
            this.isLoading = true;
            const [user, authToken] = await this.registerService.register(
                firstName,
                lastName,
                alias,
                password,
                imageBytes,
                imageFileExtension
            );

            this.view.updateUserInfo(user, user, authToken, rememberMe);
            this.navigate("/");
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to register user because of exception: ${error}`
            );
        } finally {
            this.isLoading = false;
        }
    };

    public handleImageFile = (file: File | undefined) => {
        if (file) {
            this.imageUrl = (URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const imageStringBase64 = event.target?.result as string;

                // Remove unnecessary file metadata from the start of the string.
                const imageStringBase64BufferContents =
                    imageStringBase64.split("base64,")[1];

                const bytes: Uint8Array = Buffer.from(
                    imageStringBase64BufferContents,
                    "base64"
                );

                this.imageBytes = bytes;
            };
            reader.readAsDataURL(file);

            // Set image file extension (and move to a separate method)
            const fileExtension = this.getFileExtension(file);
            if (fileExtension) {
                this.imageFileExtension = fileExtension;
            }
        } else {
            this.imageUrl = "";
            this.imageBytes = new Uint8Array();
        }
    };

    private getFileExtension = (file: File): string | undefined => {
        return file.name.split(".").pop();
    };
}