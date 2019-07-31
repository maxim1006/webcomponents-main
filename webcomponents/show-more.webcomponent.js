class MShowMore extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML = `
            <slot name="image"></slot>
            <slot style="display: none"></slot>
            <span></span>
            <a href="#" onclick="event.preventDefault()" id="showMoreLink">show more</a>
            <a href="#" onclick="event.preventDefault()" id="showLessLink">show less</a>
        `;
    }

    connectedCallback() {
        const paragraph = this.shadowRoot.querySelector('span');
        const showMoreLink = this.shadowRoot.querySelector('#showMoreLink');
        const showLessLink = this.shadowRoot.querySelector('#showLessLink');
        const length = this.getAttribute('length');

        requestAnimationFrame(() => {
            if (length) {
                paragraph.textContent = this.textContent.slice(0, +length);
                showLessLink.hidden = true;
            } else {
                paragraph.textContent = this.textContent;
                showLessLink.hidden = true;
                showMoreLink.hidden = true;
            }

            showMoreLink.addEventListener('click', () => {
                paragraph.textContent = this.textContent;
                showMoreLink.hidden = true;
                showLessLink.hidden = false;
            });

            showLessLink.addEventListener('click', () => {
                paragraph.textContent = this.textContent.slice(0, +length);
                showLessLink.hidden = true;
                showMoreLink.hidden = false;
            });
        })
    }

}

customElements.define('m-show-more', MShowMore);
