import { h, Host } from "@stencil/core";
export class MFetchSearch {
    constructor() {
        this.onInputCb = (event) => {
            // эмичу эвент в эфир
            this.mFetchSearchInputEmit.emit({
                originalEvent: event
            });
            // могу так дернуть эвент который передали в пропсах
            this.onInputProp(event);
            this.isTouched = true;
        };
    }
    // могу использовать так, а могу и <Host></Host>
    // hostData?: () => {
    //     class?: {
    //         [className: string]: boolean;
    //     };
    //     style?: any;
    //     [attrName: string]: any;
    // };
    // hostData() {
    //     return {class: {
    //         '_touched': this.isTouched
    //     }};
    // }
    // могу подписаться на любой кастомный эвент таким образом, также прокинув боди например могу слушать даже
    // сиблингов и любые эвенты подобные на страничке
    onMFetchSearchInputEmit(event) {
        console.log("body:mFetchSearchInputEmit ", event);
    }
    render() {
        console.log(this.isTouched, " this.isTouched");
        return (h(Host, { class: { '_touched': this.isTouched } },
            h("input", { type: "text", onInput: this.onInputCb })));
    }
    static get is() { return "m-fetch-search"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "onInputProp": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(event) => {}",
                "resolved": "(event: any) => {}",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "isTouched": {}
    }; }
    static get events() { return [{
            "method": "mFetchSearchInputEmit",
            "name": "mFetchSearchInputEmit",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "Object",
                "resolved": "Object",
                "references": {
                    "Object": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get listeners() { return [{
            "name": "mFetchSearchInputEmit",
            "method": "onMFetchSearchInputEmit",
            "target": "body",
            "capture": false,
            "passive": false
        }]; }
}
