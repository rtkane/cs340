import {StatusService} from "../model/service/StatusService";
import {AuthToken, Status, User} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";

export interface PostStatusView extends MessageView {
    setPost: (string: string) => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView>{
    private service: StatusService;


    constructor(view: PostStatusView) {
        super(view);
        this.service = new StatusService();
    }

    public async submitPost(authToken: AuthToken, post: string, currentUser: User) {

        try {
            this.isLoading = true;
            this.view.displayInfoMessage("Posting status...", 0);

            const status = new Status(post, currentUser!, Date.now());

            await this.service.postStatus(authToken!, status);

            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to post the status because of exception: ${error}`
            );
        } finally {
            this.view.clearLastInfoMessage();
            this.isLoading = false;
        }
    };


}