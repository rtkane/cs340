import {Presenter, View} from "./Presenter";
import {AuthToken, User} from "tweeter-shared";
export const PAGE_SIZE = 10;

export interface PagedItemView<T> extends View {
    addItems: (newItems: T[]) => void;
}

export abstract class PagedItemPresenter<T, U> extends Presenter<PagedItemView<T>>{
    private _hasMoreItems = true;
    private _lastItem: T | null = null;
    private _service: U;

    public constructor(view: PagedItemView<T>) {
        super(view);
        this._service = this.createService();
    }

    protected abstract createService(): U;

    protected get service(){
        return this._service;
    }


    get hasMoreItems() {
        return this._hasMoreItems;
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    protected get lastItem(): T | null {
        return this._lastItem;
    }

    protected set lastItem(value: T | null) {
        this._lastItem = value;
    }


    public async loadMoreItems(authToken: AuthToken, userAlias: string) {
        await this.doFailureReportingOperation(this.getItemDescription(), async () => {
            const [newItems, hasMore] = await this.getMoreItems(
                authToken!,
                userAlias,
            );

            this.hasMoreItems = hasMore;
            this.lastItem = newItems[newItems.length - 1];
            this.view.addItems(newItems);
        })
    };

    protected abstract getItemDescription(): string;

    protected abstract getMoreItems(authToken: AuthToken, userAlias: string): Promise<[T[], boolean]>;


    reset() {
        this.lastItem = null;
        this.hasMoreItems = true;
    }

}