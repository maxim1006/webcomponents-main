class MConfirmLink extends HTMLAnchorElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', (e) => {
            if (!confirm('Do u really need to go?')) {
                e.preventDefault();
            }
        })
    }
}

// в третьем аргументе указываю к какому тегу аттачить этот компонент
customElements.define('m-confirm-link', MConfirmLink, {extends: "a"});
