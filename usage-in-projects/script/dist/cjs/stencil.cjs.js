'use strict';

const core = require('./core-985d3a19.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["m-stock.cjs",[[1,"m-stock"]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["m-fetch_5.cjs",[[1,"m-fetch",{"familyMember":[513,"family-member"],"watchedProp":[1,"watched-prop"],"familyData":[32],"loading":[32],"filteredFamilyData":[32]}],[1,"m-side-bar",{"header":[513],"open":[1540],"contactVisible":[32],"triggerOpen":[64]}],[1,"m-tab-panel",{"model":[16],"activeTab":[2,"active-tab"]}],[1,"m-fetch-search",{"onInputProp":[16],"isTouched":[32]},[[32,"mFetchSearchInputEmit","onMFetchSearchInputEmit"]]],[1,"m-spinner"]]]], options);
});
