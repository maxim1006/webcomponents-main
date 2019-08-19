import { h } from "@stencil/core";
import axios from "axios";
import { MFetchRow } from "./fetch-row";
export class MFetch {
    constructor() {
        this.filteredFamilyData = [];
        this.fetchFamilyData = async (event) => {
            // do not make form send
            event.preventDefault();
            // могу найти через шадоу дом, но лучше по ссылке из темплейта
            // const type = (this.element.shadowRoot.querySelector('#select') as HTMLSelectElement).value;
            //
            const type = this.selectElement.value;
            this.loading = true;
            // axios
            try {
                const { data } = await axios.post("http://localhost:3000/api/family", {
                    body: {
                        type
                    }
                });
                this.familyData = data;
                if (Array.isArray(data)) {
                    this.filteredFamilyData = data.slice();
                }
                this.loading = false;
            }
            catch (e) {
                console.log("fetchFamilyData error ", e);
                this.loading = false;
            }
            // fetch
            // try {
            //     const response = await fetch("http://localhost:3000/api/family", {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json;charset=utf-8'
            //         },
            //         body: JSON.stringify({type})
            //     });
            //
            //     const responseJson = await response.json();
            //     console.log(responseJson);
            //
            //     this.familyData = responseJson;
            // } catch (e) {
            //     console.log("fetchFamilyData error ", e);
            // }
        };
    }
    watchedPropChanged(newValue, oldValue) {
        console.log('watchedProp ', newValue, oldValue);
    }
    connectedCallback() {
        // так как не прошел первый render то тут будет undefined в отличие от вебкомпонент
        console.log(this.selectElement, " connectedCallback");
    }
    // вызовется 1 раз до первого рендера, тут работаю с моделью
    componentWillLoad() {
        console.log(this.selectElement, " componentWillLoad");
    }
    // вызовется 1 раз после первого рендера
    componentDidLoad() {
        // тут элемент уже будет доступен
        console.log(this.selectElement, " componentDidLoad");
    }
    // тут удаляю все хендлеры, подписки, таймеры
    componentDidUnload() {
    }
    // вызовется перед тем как проперти или стейт поменяется
    componentWillUpdate() {
        console.log("componentWillUpdate");
    }
    // вызовется после того как проперти или стейт поменяется
    componentDidUpdate() {
        console.log("componentDidUpdate");
    }
    render() {
        console.log('fetch render');
        const familyTableHead = this.getHead();
        const familyTableBody = this.getBody();
        const options = this.getOptions();
        const familyTable = this.familyData ? h("table", null,
            familyTableHead,
            familyTableBody) : null;
        const loader = this.loading ? h("m-spinner", null) : null;
        return [
            h("form", { novalidate: true, onSubmit: this.fetchFamilyData, name: 'fetchForm' },
                h("select", { id: 'select', ref: el => this.selectElement = el }, options),
                h("button", { type: "submit" }, "get info")),
            h("m-fetch-search", { onInputProp: this.onInput.bind(this) }),
            familyTable,
            loader
        ];
    }
    onInput(event) {
        if (Array.isArray(this.familyData)) {
            this.filteredFamilyData = this.familyData.filter(item => {
                const name = item.name.toLowerCase();
                const value = event.target.value;
                return name.includes(value) && item;
            });
        }
    }
    getHead() {
        return (h("thead", null,
            h("tr", null,
                h("td", null, "Name"),
                h("td", null, "Age"))));
    }
    getBody() {
        let familyTableBodyRows;
        if (Array.isArray(this.familyData)) {
            familyTableBodyRows = this.filteredFamilyData
                .map(({ name, age }) => {
                return h(MFetchRow, { name: name, age: age });
            });
        }
        else if (this.familyData) {
            const { name, age } = this.familyData;
            familyTableBodyRows =
                h(MFetchRow, { name: name, age: age });
        }
        return (h("tbody", null, familyTableBodyRows));
    }
    getOptions() {
        return ['all', 'father', 'mother', 'children'].map((item) => {
            if (item === this.familyMember) {
                return h("option", { value: item, selected: true }, item);
            }
            else {
                return h("option", { value: item }, item);
            }
        });
    }
    static get is() { return "m-fetch"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "familyMember": {
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
            "attribute": "family-member",
            "reflect": true
        },
        "watchedProp": {
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
            "attribute": "watched-prop",
            "reflect": false
        }
    }; }
    static get states() { return {
        "familyData": {},
        "loading": {},
        "filteredFamilyData": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "watchedProp",
            "methodName": "watchedPropChanged"
        }]; }
}
