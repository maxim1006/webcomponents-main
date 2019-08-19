import { h, Host } from "@stencil/core";
export class MSideBar {
    constructor() {
        // State - в отличие от Props следит за изменениями свойства не снаружи, а внутренними изменениями,
        // как стейт компоненты, при изменении этого свойства вызовется render()
        this.contactVisible = false;
        this.header = "Default header";
        this.onCloseButtonClick = () => {
            this.open = false;
        };
        this.onOverlayClick = () => {
            this.open = false;
        };
        this.toggleContact = () => {
            // тут меняю внутреннее свойство contactVisible забинденное через State
            this.contactVisible = !this.contactVisible;
        };
    }
    // это публичный метод, обязательно должен писать с async
    async triggerOpen() {
        this.open = true;
    }
    render() {
        const contact = this.contactVisible && (h("div", { class: "m-side-bar__section" }, "My contacts"));
        return (h(Host, { class: {
                'm-side-bar': true,
                '_open': this.open
            } },
            h("div", { onClick: this.onOverlayClick, class: "m-side-bar__overlay" }),
            h("aside", { class: "m-side-bar__inner" },
                h("header", { class: "m-side-bar__header" },
                    h("slot", { name: "header" },
                        h("h3", null, this.header)),
                    h("button", { class: "m-side-bar__header-close-button", onClick: this.onCloseButtonClick }, "X")),
                h("section", { class: "m-side-bar__section" },
                    h("slot", { name: "body" }, "Default body"),
                    h("button", { onClick: this.toggleContact }, "Toggle contact"),
                    contact),
                h("footer", { class: "m-side-bar__footer" },
                    h("slot", { name: "footer" }, "Default footer")))));
    }
    static get is() { return "m-side-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["side-bar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["side-bar.css"]
    }; }
    static get properties() { return {
        "header": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "header",
            "reflect": true,
            "defaultValue": "\"Default header\""
        },
        "open": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "open",
            "reflect": true
        }
    }; }
    static get states() { return {
        "contactVisible": {}
    }; }
    static get methods() { return {
        "triggerOpen": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
}
