import { EventEmitter } from "../../stencil.core";
export interface mTabPanelModel {
    items: mTabPanelItemModel[];
}
export interface mTabPanelItemModel {
    header: string;
    content: string;
}
export declare class TabPanel {
    model: mTabPanelModel;
    activeTab: number;
    mTabPanelChange: EventEmitter;
    render(): any;
    _renderTabs(): any;
    onTabHeaderClick: (index: number, event: Event) => void;
}
