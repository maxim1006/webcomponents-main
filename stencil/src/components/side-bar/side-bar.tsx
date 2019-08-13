import {Component, h, Host, Method, Prop, State} from "@stencil/core";

@Component({
    tag: 'm-side-bar',
    styleUrl: 'side-bar.scss',

    // добавляет атрибут ко всем тегам
    // scoped: true,

    // добавляет стили в shadowRoot
    shadow: true
})
export class MSideBar {
    // State - в отличие от Props следит за изменениями свойства не снаружи, а внутренними изменениями,
    // как стейт компоненты, при изменении этого свойства вызовется render()
    @State()
    contactVisible = false;

    @Prop({
        // для синхронизации проперти и атрибута
        reflect: true
    })
    header: string = "Default header";

    // stencil автоматом синхронизирует пропертю при ее использовании в контроллере
    @Prop({
        reflect: true,

        // по умолчанию получу ворнинг, так как все иммьютбл
        mutable: true
    })
    open: boolean;

    // это публичный метод, обязательно должен писать с async
    @Method()
    async triggerOpen() {
        this.open = true;
    }

    render() {
        const contact = this.contactVisible && (
            <div class={"m-side-bar__section"}>My contacts</div>
        );

        return (
            <Host class={{
                'm-side-bar': true,
                '_open': this.open
            }}>
                <div onClick={this.onOverlayClick} class={"m-side-bar__overlay"}></div>
                <aside class="m-side-bar__inner">
                    <header class={"m-side-bar__header"}>
                        <slot name="header"><h3>{this.header}</h3></slot>
                        <button
                            class={"m-side-bar__header-close-button"}
                            onClick={this.onCloseButtonClick}
                        >X</button>
                    </header>
                    <section class="m-side-bar__section">
                        <slot name="body">Default body</slot>
                        <button onClick={this.toggleContact}>Toggle contact</button>
                        {contact}
                    </section>
                    <footer class={"m-side-bar__footer"}>
                        <slot name="footer">Default footer</slot>
                    </footer>
                </aside>
            </Host>
        )
    }

    onCloseButtonClick = () => {
        this.open = false;
    }

    onOverlayClick = () => {
        this.open = false;
    }

    toggleContact = () => {
        // тут меняю внутреннее свойство contactVisible забинденное через State
        this.contactVisible = !this.contactVisible;
    }
}
