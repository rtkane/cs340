export interface View {
    displayErrorMessage: (message: string) => void;
}

export interface MessageView extends View {
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
}


export class Presenter<V extends View> {
    private _view: V;
    protected isLoading: boolean = false;

    protected constructor(view: V) {
        this._view = view;
    }

    protected get view(): V {
        return this._view;
    }

    public async doFailureReportingOperation(operationDescription: string, operation: () => Promise<void>): Promise<void> {
        try {
            await operation();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to ${operationDescription} because of exception: ${error}`
            );
        }
    };

}