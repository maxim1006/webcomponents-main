class Tooltip extends HTMLElement {
    _tooltipText = "Init tooltip text";

    // для логики
    constructor() {
        super();
    }

    // для вью
    connectedCallback() {
        // могу так
        // this.insertAdjacentHTML('afterbegin', `<span>(?)</span>`);

        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        this._createTooltipAnchor();
        this._createTooltip();

        this.newSpan.addEventListener('mouseenter', this._show);
        this.newSpan.addEventListener('mouseleave', this._hide);

        this.appendChild(this.newSpan);
    }

    disconnectedCallback() {
        console.log('Tooltip is removed');
    }

    _createTooltip() {
        this.tooltip = document.createElement('span');
        this.tooltip.style.cssText = `
            position: absolute; 
            left: 50%; 
            top: 0; 
            transform: translate(-50%, -100%);
            min-width: 100px;
        `;
        this.tooltip.textContent = this._tooltipText;
    }

    _createTooltipAnchor() {
        this.newSpan = document.createElement('span');
        this.newSpan.style.cssText = 'position: relative;';
        this.newSpan.textContent = '(?)';
    }

    _hide = () => {
        this.newSpan.removeChild(this.tooltip);
        this.tooltip.style.display = 'none';
    };

    _show = (e) => {
        this.newSpan.appendChild(this.tooltip);
        this.tooltip.style.display = 'block';
    };
}

customElements.define('m-tooltip', Tooltip);

