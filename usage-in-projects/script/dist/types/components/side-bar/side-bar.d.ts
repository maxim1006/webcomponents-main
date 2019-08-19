export declare class MSideBar {
    contactVisible: boolean;
    header: string;
    open: boolean;
    triggerOpen(): Promise<void>;
    render(): any;
    onCloseButtonClick: () => void;
    onOverlayClick: () => void;
    toggleContact: () => void;
}
