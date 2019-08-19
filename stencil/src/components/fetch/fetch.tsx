import {Component, h, Element, State, Prop, Watch} from "@stencil/core";
import axios from "axios";
import {MFetchRow} from "./fetch-row";

@Component({
    tag: 'm-fetch',
    styleUrl: 'fetch.scss',
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

    @State()
    loading: boolean;

    @State()
    filteredFamilyData: any = [];

    @Prop({
        reflect: true
    })
    familyMember: string;

    @Prop()
    watchedProp: string;

    @Watch('watchedProp')
    watchedPropChanged(newValue: string, oldValue: string) {
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
        const familyTable = this.familyData ? <table>{familyTableHead}{familyTableBody}</table> : null;
        const loader = this.loading ? <m-spinner></m-spinner> : null;

        return [
            <form novalidate onSubmit={this.fetchFamilyData} name={'fetchForm'}>
                {/*так нахожу по ссылке элемент*/}
                <select id={'select'} ref={el => this.selectElement = el}>
                    {options}
                </select>
                <button type={"submit"}>get info</button>
            </form>,
            <m-fetch-search onInputProp={this.onInput.bind(this)}/>,
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

    fetchFamilyData = async (event: Event) => {
        // do not make form send
        event.preventDefault();

        // могу найти через шадоу дом, но лучше по ссылке из темплейта
        // const type = (this.element.shadowRoot.querySelector('#select') as HTMLSelectElement).value;

        //
        const type = (this.selectElement as HTMLSelectElement).value;

        this.loading = true;

        // axios
        try {
            const {data} = await axios.post("http://localhost:3000/api/family", {
                body: {
                    type
                }
            });

            this.familyData = data;

            if (Array.isArray(data)) {
                this.filteredFamilyData = data.slice();
            }

            this.loading = false;
        } catch (e) {
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

    }

    getHead() {
        return (
            <thead>
            <tr>
                <td>Name</td>
                <td>Age</td>
            </tr>
            </thead>
        );
    }

    getBody() {
        let familyTableBodyRows;

        if (Array.isArray(this.familyData)) {
            familyTableBodyRows = this.filteredFamilyData
                .map(({name, age}) => {
                    return <MFetchRow name={name} age={age} />
                });
        } else if (this.familyData) {
            const {name, age} = this.familyData;
            familyTableBodyRows =
                <MFetchRow name={name} age={age} />
        }

        return (
            <tbody>
                {familyTableBodyRows}
            </tbody>
        );
    }

    getOptions() {
        return ['all', 'father', 'mother', 'children'].map((item) => {
            if (item === this.familyMember) {
                return <option value={item} selected>{item}</option>
            } else {
                return <option value={item}>{item}</option>
            }
        });
    }
}
