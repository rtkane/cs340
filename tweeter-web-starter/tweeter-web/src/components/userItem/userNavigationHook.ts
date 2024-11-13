import useToastListener from "../toaster/ToastListenerHook";
import { AuthToken, FakeData, User } from "tweeter-shared";
import useInfoHook from "../userInfo/userInfoHook";

interface NavigationListener {
    navigateToUser: (event: React.MouseEvent) => Promise<void>;
}

const userNavigationHook = (): NavigationListener => {
    const { displayErrorMessage } = useToastListener();
    const { setDisplayedUser, currentUser, authToken } = useInfoHook();

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();

        try {
            const alias = extractAlias(event.target.toString());

            const user = await getUser(authToken!, alias);

            if (user) {
                if (currentUser?.equals(user)) {
                    setDisplayedUser(currentUser);
                } else {
                    setDisplayedUser(user);
                }
            }
        } catch (error) {
            displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
    };

    const extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
    };

    const getUser = async (authToken: AuthToken, alias: string): Promise<User | null> => {
        // Replace with a real server call
        return FakeData.instance.findUserByAlias(alias);
    };

    return { navigateToUser };
};

export default userNavigationHook;
