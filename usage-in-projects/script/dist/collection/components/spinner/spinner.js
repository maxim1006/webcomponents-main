import { h } from "@stencil/core";
export class MSpinner {
    render() {
        return (h("div", { class: "m-spinner" },
            h("div", { class: "m-spinner__item" }),
            h("div", { class: "m-spinner__item" }),
            h("div", { class: "m-spinner__item" }),
            h("div", { class: "m-spinner__item" })));
    }
    static get is() { return "m-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["spinner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["spinner.css"]
    }; }
}
