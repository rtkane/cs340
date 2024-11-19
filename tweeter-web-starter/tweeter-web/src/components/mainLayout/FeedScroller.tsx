import {AuthToken, FakeData, Status, User} from "tweeter-shared";
import {useState, useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import useInfoHook from "../userInfo/userInfoHook";

export const PAGE_SIZE = 10;

const FeedScroller = () => {
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

    // Load initial items whenever the displayed user changes. Done in a separate useEffect hook so the changes from reset will be visible.


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


    return
        "Not used anymore right";

};

export default FeedScroller;
