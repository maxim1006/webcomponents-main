import { EventEmitter } from "../../stencil.core";
export declare class MFetchSearch {
    isTouched: boolean;
    mFetchSearchInputEmit: EventEmitter<Object>;
    onMFetchSearchInputEmit(event: any): void;
    onInputProp: (event: any) => {};
    onInputCb: (event: any) => void;
    render(): any;
}
