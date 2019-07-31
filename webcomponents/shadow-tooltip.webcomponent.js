class ShadowTooltip extends HTMLElement {
    _tooltipText = "Init tooltip text";
    newSpan;
    tooltip;
    tooltipVisible = false;

    // для логики
    constructor() {
        super();

        // задаю смогу ли достучаться до шадоу дома снаружи, если нет, то "close"
        // this.shadowRoot - появляется сразу как аттачу шадоу
        this.attachShadow({mode: "open"});

        // задаю инит темплейт внутри компоненты (есть такой же снаружи)
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    /*color: red;*/
                }
                
                /*на хосте тоже могу следить за классами*/
                :host(._error) {
                    color: red;
                }
                
                /*если эта компонента лежит в родителе с классом .m-shadow-tooltip-container*/
                :host-context(.m-shadow-tooltip-container) {
                    color: #80bc80;
                }
                
                /*выбрать любой слотед контент*/
                /*::slotted(*) {*/
                /*    margin: 10px;*/
                /*}*/
                
                /*можно выбрать по тегу*/
                /*::slotted(img) {*/
                /*    border: 2px solid orange;*/
                /*}*/
                
                /*можно по классу*/
                ::slotted(.img) {
                    border: 2px solid orange;
                }
                
                .m-shadow-tooltip__tooltip {
                    position: absolute; 
                    left: 50%; 
                    top: 0; 
                    transform: translate(-50%, -100%);
                    min-width: 100px;
                    background-color: #f1fafb;
                }
                
                /*даром что этот код внутри темплейта, могу его поменять через css-variables*/
                .sign {
                    position: relative;
                    color: purple;
                    color: var(--m-shadow-tooltip-sign-color, purple);
                }
            </style>
            <span class="sign">(?)</span>
            <slot>Some default from slot</slot>
            <slot name="image"></slot>
        `;
    }

    // для вью
    connectedCallback() {
        // могу так
        // this.insertAdjacentHTML('afterbegin', `<span>(?)</span>`);

        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        this._createTooltip();

        // аттачу темплейт который взял извне компоненты
        // const outsideTemplate = document.querySelector('#outsideTooltipTemplate');
        // // outsideTemplate.content - это document fragment
        // this.shadowRoot.appendChild(outsideTemplate.content.cloneNode(true));

        this.newSpan = this.shadowRoot.querySelector("span");

        this.newSpan.addEventListener('mouseenter', this._show);
        this.newSpan.addEventListener('mouseleave', this._hide);
    }

    // сработает только для атрибутов которые возвращает observedAttributes
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);

        if (oldValue === newValue) {
            return;
        }

        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    // возвращает атрибуты которые при изменении будут вызывать attributeChangedCallback
    static get observedAttributes() {
        return ['text', 'complex-name'];
    }

    disconnectedCallback() {
        console.log('Tooltip is removed');
        this.newSpan.removeEventListener('mouseenter', this._show);
        this.newSpan.removeEventListener('mouseleave', this._hide);
    }

    // всю работу с домом стараюсь делать в рендер методе
    _render() {
        if (this.tooltipVisible) {
            this.tooltip.textContent = this._tooltipText;
            this.newSpan.appendChild(this.tooltip);
            this.tooltip.style.display = 'block';
        } else {
            this.newSpan.removeChild(this.tooltip);
            this.tooltip.style.display = 'none';
        }
    }

    _createTooltip() {
        this.tooltip = document.createElement('span');
        this.tooltip.classList.add('m-shadow-tooltip__tooltip');
    }

    _hide = () => {
        this.tooltipVisible = false;
        this._render();
    };

    _show = (e) => {
        this.tooltipVisible = true;
        this._render();
    };
}

customElements.define('m-shadow-tooltip', ShadowTooltip);

