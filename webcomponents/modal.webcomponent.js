class MModal extends HTMLElement {
    mModal;
    mModalOverlay;
    visibleTimeoutId;

    static get observedAttributes() {
        return ['visible'];
    }

    get visible() {
       return this.getAttribute('visible');
    }

    set visible(value) {
        const bodyStyle = document.body.style;

        if (value) {
            bodyStyle.pointerEvents = 'none';
            bodyStyle.overflow = 'hidden';
            this.setAttribute('visible', value);
        } else {
            bodyStyle.pointerEvents = bodyStyle.overflow = null;
            this.removeAttribute('visible');
        }

        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'visible') {
            this.visible = newValue;
        }
    }

    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                :host([visible]) {
                    color: #333;
                }
                
                .m-modal-overlay {
                    display: none;
                    justify-content: center;
                    align-items: flex-start;
                    position: fixed;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background-color: rgba(0,0,0,0.2);
                    pointer-events: auto;
                    overflow: auto;
                }
                
                .m-modal-overlay._visible {
                    display: flex;
                }
                
                .m-modal {
                    padding: 30px;
                    background-color: #f2f2f2;
                    opacity: 0;
                    transform: translate3d(0, 50px, 0);
                    transition: opacity 0.2s, transform 0.2s cubic-bezier(0, 0, 0.2, 1);
                }
                
                .m-modal._visible {
                    opacity: 1;
                    transform: translate3d(0, 100px, 0);
                }
            </style>
        
            <div class="m-modal-overlay" id="mModalOverlay">
                <div class="m-modal" id="mModal">
                    <slot name="header"><h2>Default header</h2></slot>
                    <slot name="body">Default body</slot>
                    <slot name="controls">Default controls</slot>
                </div>
            </div>
        `;

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[0].addEventListener('slotchange', () => {
            // console.log(slots[0].assignedNodes());
        });
        slots[2].addEventListener('slotchange', () => {
            // console.log(slots[2].assignedNodes());
        });
    }

    connectedCallback() {

        this.mModal = this.shadowRoot.querySelector("#mModal");
        this.mModalOverlay = this.shadowRoot.querySelector("#mModalOverlay");

        document.body.addEventListener('keydown', this._bodyKeydown);

        this.mModalOverlay.addEventListener('click', () => {
            this.visible = false;
        });

        // stop from modal close
        this.mModal.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }
    
    render() {
        if (this.visible) {
            this.mModalOverlay.classList.add('_visible');

            this.visibleTimeoutId = null;
            this.visibleTimeoutId = setTimeout(() => {
                this.mModal.classList.add('_visible');
            }, 0);
        } else {
            this.mModal.addEventListener('transitionend', this._modalTransitionEnd);
            this.mModal.classList.remove('_visible');
        }
        
    }

    disconnectedCallback() {
        clearTimeout(this.visibleTimeoutId);

        document.body.removeEventListener('keydown', this._bodyKeydown);
        this.mModal.removeEventListener('transitionend', this._modalTransitionEnd);
    }

    _bodyKeydown = (event) => {
        if (event.which === 27) {
            this.visible = false;
        }
    }

    _modalTransitionEnd = () => {
        this.mModalOverlay.classList.remove('_visible');
        this.mModal.removeEventListener('transitionend', this._modalTransitionEnd);
        this.emitOnCloseEndEvent();
    }

    emitOnCloseEndEvent() {
        // // Не могу испльзовать detail чтобы передать кастомную дату
        // this.dispatchEvent(new Event('onCloseEnd', {
        //     bubbles: true,
        //     // может ли эвент покинуть shadow dom, нужно если задумаю эмитить эвенты с элеметов шадоу дома,
        //     // лучше так не делать а эмитить просто с самого элемента (хоста)
        //     composed: true,
        //     cancelable: true,
        // }));
        //
        // // в кастомном эвенте могу передать detail
        // this.dispatchEvent(new CustomEvent('onCloseEnd', {
        //     bubbles: true,
        //     // может ли эвент покинуть shadow dom, нужно если задумаю эмитить эвенты с элеметов шадоу дома,
        //     // лучше так не делать а эмитить просто с самого элемента (хоста)
        //     composed: true,
        //     cancelable: true,
        //     // detail использую для прокидывания кастомных данных
        //     detail: {
        //         customData: true
        //     }
        // }));

        this.dispatchEvent(new CustomEvent('onCloseEnd', {
            detail: {
                customData: true
            }
        }));
    }

    // Public method
    open() {
        this.visible = true;
    }

}

customElements.define('m-modal', MModal);
