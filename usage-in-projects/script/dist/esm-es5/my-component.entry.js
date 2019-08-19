import { r as registerInstance, h } from './core-ad580664.js';
function format(first, middle, last) {
    return ((first || '') +
        (middle ? " " + middle : '') +
        (last ? " " + last : ''));
}
var MyComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
    }
    class_1.prototype.getText = function () {
        return format(this.first, this.middle, this.last);
    };
    class_1.prototype.render = function () {
        return h("div", null, "Hello, World I'm ", this.getText());
    };
    Object.defineProperty(class_1, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { MyComponent as my_component };
