import { a as patchEsm, b as bootstrapLazy } from './core-ad580664.js';
var defineCustomElements = function (win, options) {
    return patchEsm().then(function () {
        bootstrapLazy([["m-stock", [[1, "m-stock"]]], ["my-component", [[1, "my-component", { "first": [1], "middle": [1], "last": [1] }]]], ["m-fetch_5", [[1, "m-fetch", { "familyMember": [513, "family-member"], "watchedProp": [1, "watched-prop"], "familyData": [32], "loading": [32], "filteredFamilyData": [32] }], [1, "m-side-bar", { "header": [513], "open": [1540], "contactVisible": [32], "triggerOpen": [64] }], [1, "m-tab-panel", { "model": [16], "activeTab": [2, "active-tab"] }], [1, "m-fetch-search", { "onInputProp": [16], "isTouched": [32] }, [[32, "mFetchSearchInputEmit", "onMFetchSearchInputEmit"]]], [1, "m-spinner"]]]], options);
    });
};
export { defineCustomElements };
