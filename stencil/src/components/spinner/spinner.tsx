import {Component, h} from "@stencil/core";

@Component({
    tag: "m-spinner",
    shadow: true,
    styleUrl: 'spinner.scss',
})
export class MSpinner {
    render() {
        return (
            <div class="m-spinner">
                <div class="m-spinner__item"></div>
                <div class="m-spinner__item"></div>
                <div class="m-spinner__item"></div>
                <div class="m-spinner__item"></div>
            </div>
        );
    }
}
