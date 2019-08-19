import { h } from "@stencil/core";
export class TabPanel {
    constructor() {
        this.activeTab = 0;
        this.onTabHeaderClick = (index, event) => {
            this.activeTab = index;
            this.mTabPanelChange.emit({
                originalEvent: event,
                tabIndex: index,
            });
        };
    }
    render() {
        if (this.model
            && Array.isArray(this.model.items)) {
            return this._renderTabs();
        }
    }
    _renderTabs() {
        const headerItems = this.model.items.map((_, index) => {
            return h("div", { class: {
                    "m-tab-panel__header-item": true,
                    "_active": this.activeTab === index
                }, onClick: this.onTabHeaderClick.bind(this, index) },
                "header ",
                index);
        });
        const contentItems = this.model.items.map((_, index) => {
            return h("div", { class: {
                    "m-tab-panel__content-item": true,
                    "_active": this.activeTab === index
                }, style: {
                    transform: `translate3d(${this.activeTab * -100 + '%, 0, 0)'}`
                } },
                "content ",
                index);
        });
        return (h("div", { class: "m-tab-panel" },
            h("div", { class: "m-tab-panel__header" }, headerItems),
            h("div", { class: "m-tab-panel__content" }, contentItems)));
    }
    static get is() { return "m-tab-panel"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["tab-panel.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tab-panel.css"]
    }; }
    static get properties() { return {
        "model": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "mTabPanelModel",
                "resolved": "mTabPanelModel",
                "references": {
                    "mTabPanelModel": {
                        "location": "local"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "activeTab": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "active-tab",
            "reflect": false,
            "defaultValue": "0"
        }
    }; }
    static get events() { return [{
            "method": "mTabPanelChange",
            "name": "mTabPanelChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
