import {AuthToken, FakeData, Status, User} from "tweeter-shared";
import {useState, useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import useInfoHook from "../userInfo/userInfoHook";

export const PAGE_SIZE = 10;

const StoryScroller = () => {
    const {displayErrorMessage} = useToastListener();
    const [items, setItems] = useState<Status[]>([]);
    const [newItems, setNewItems] = useState<Status[]>([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [lastItem, setLastItem] = useState<Status | null>(null);
    const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

    const addItems = (newItems: Status[]) =>
        setNewItems(newItems);

    const {displayedUser, authToken} =
        useInfoHook();

    // Initialize the component whenever the displayed user changes
    useEffect(() => {
        reset();
    }, [displayedUser]);



    // Add new items whenever there are new items to add
    useEffect(() => {
        if (newItems) {
            setItems([...items, ...newItems]);
        }
    }, [newItems])

    const reset = async () => {
        setItems([]);
        setNewItems([]);
        setLastItem(null);
        setHasMoreItems(true);
        setChangedDisplayedUser(true);
    }





    return (
        <div className="container px-0 overflow-visible vh-100">

        </div>
    );
};

export default StoryScroller;
