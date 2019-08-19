export declare class MFetch {
    selectElement: HTMLElement;
    element: HTMLElement;
    familyData: any;
    loading: boolean;
    filteredFamilyData: any;
    familyMember: string;
    watchedProp: string;
    watchedPropChanged(newValue: string, oldValue: string): void;
    connectedCallback(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    render(): any[];
    onInput(event: any): void;
    fetchFamilyData: (event: Event) => Promise<void>;
    getHead(): any;
    getBody(): any;
    getOptions(): any[];
}
