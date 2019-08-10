import {Component, Prop, h} from "@stencil/core";


export interface mTabPanelModel {
    items: mTabPanelItemModel[];
}

export interface mTabPanelItemModel {
    header: string;
    content: string;
}


@Component({
    tag: 'm-tab-panel',
    styleUrl: 'tab-panel.scss',

    // добавляет атрибут ко всем тегам
    // scoped: true,

    // добавляет стили в shadowRoot
    shadow: true
})
export class TabPanel {
    @Prop()
    model: mTabPanelModel;

    @Prop()
    activeTab: number = 0;

    render() {
        if (this.model
        && Array.isArray(this.model.items)) {
            return this._renderTabs();
        }
    }

    _renderTabs() {
        const headerItems = this.model.items.map((_, index) => {
            return <div
                class={{
                    "m-tab-panel__header-item": true,
                    "_active": this.activeTab === index
                }}
                onClick={this.onTabHeaderClick.bind(this, index)}
            >header {index}</div>
        });

        const contentItems = this.model.items.map((_, index) => {
            return <div
                class={{
                    "m-tab-panel__content-item": true,
                    "_active": this.activeTab === index
                }}
                style={{
                    transform: `translate3d(${this.activeTab * -100 + '%, 0, 0)'}`
                }}
            >content {index}</div>
        });

        return (
            <div class="m-tab-panel">
                <div class="m-tab-panel__header">
                    {headerItems}
                </div>
                <div class="m-tab-panel__content">
                    {contentItems}
                </div>
            </div>
        );
    }

    onTabHeaderClick = (index: number) => {
        this.activeTab = index;
    }
}
