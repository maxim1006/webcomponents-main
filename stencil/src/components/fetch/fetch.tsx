import {Component, h, Element, State} from "@stencil/core";
import axios from "axios";
import {MFetchRow} from "./fetch-row";

@Component({
    tag: 'm-fetch',
    shadow: true
})
export class MFetch {
    // могу просто референс получить элемента
    selectElement: HTMLElement;

    // так получаю хост элемент и могу в шадоу доме у него найти
    // this.element.shadowRoot.querySelector('#select')
    @Element() element: HTMLElement;

    @State()
    familyData: any;

    connectedCallback() {
        // так как не прошел первый render то тут будет undefined в отличие от вебкомпонент
        console.log(this.selectElement);
    }

    componentDidLoad() {
        // тут элемент уже будет доступен
        console.log(this.selectElement);
    }

    render() {
        const familyTableHead = <thead>
            <tr>
                <td>Name</td>
                <td>Age</td>
            </tr>
        </thead>;

        let familyTableBody, familyTableBodyRows;

        if (Array.isArray(this.familyData)) {
            familyTableBodyRows = this.familyData.map(({name, age}) => {
                return <MFetchRow name={name} age={age} />
            })
        } else if (this.familyData) {
            const {name, age} = this.familyData;
            familyTableBodyRows =
                <MFetchRow name={name} age={age} />
        }

        familyTableBody =
        <tbody>
            {familyTableBodyRows}
        </tbody>;

        const familyTable = this.familyData ? <table>{familyTableHead}{familyTableBody}</table> : null;

        return [
            <form novalidate onSubmit={this.fetchFamilyData} name={'fetchForm'}>
                {/*так нахожу по ссылке элемент*/}
                <select id={'select'} ref={el => this.selectElement = el}>
                    <option value="father">father</option>
                    <option value="mother">mother</option>
                    <option value="children">children</option>
                </select>
                <button type={"submit"}>get info</button>
            </form>,
            familyTable
        ];
    }

    fetchFamilyData = async (event: Event) => {
        // do not make form send
        event.preventDefault();

        // могу найти через шадоу дом, но лучше по ссылке из темплейта
        // const type = (this.element.shadowRoot.querySelector('#select') as HTMLSelectElement).value;

        //
        const type = (this.selectElement as HTMLSelectElement).value;

        // axios
        try {
            const {data} = await axios.post("http://localhost:3000/api/family", {
                body: {
                    type
                }
            });

            this.familyData = data;
        } catch (e) {
            console.log("fetchFamilyData error ", e);
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

    }

}
