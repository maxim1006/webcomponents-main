import {EventEmitter, h, Event, Component, Prop, Listen, Host, State} from "@stencil/core";

@Component({
    tag: 'm-fetch-search',
    shadow: true
})
export class MFetchSearch {
    // если хочу чтобы вызывался рендер после изменения isTouched обязательно должен добавить @State
    // иначе не будет вызываться рендер
    @State()
    isTouched: boolean;

    // эвент который могу поймать обычным эвент листенером, смотри подписку в index.html
    @Event({
        bubbles: true,
        composed: true
    })
    mFetchSearchInputEmit: EventEmitter<Object>;

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
    @Listen('mFetchSearchInputEmit', {
        target: 'body' // 'parent' | 'body' | 'document' | 'window';
    })
    onMFetchSearchInputEmit(event) {
        console.log("body:mFetchSearchInputEmit ", event);
    }

    @Prop()
    onInputProp: (event) => {};

    onInputCb = (event) => {
        // эмичу эвент в эфир
        this.mFetchSearchInputEmit.emit({
            originalEvent: event
        });

        // могу так дернуть эвент который передали в пропсах
        this.onInputProp(event);

        this.isTouched = true;
    }

    render() {
        console.log(this.isTouched, " this.isTouched");
        return (
            <Host class={{'_touched': this.isTouched}}>
                <input type="text" onInput={this.onInputCb} />
            </Host>
        );
    }
}
