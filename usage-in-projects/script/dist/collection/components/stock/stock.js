export class MStock {
    static get is() { return "m-stock"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["stock.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["stock.css"]
    }; }
}
