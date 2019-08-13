/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  mTabPanelModel,
} from './components/tab-panel/tab-panel';

export namespace Components {
  interface MFetch {
    'familyMember': string;
    'watchedProp': string;
  }
  interface MFetchSearch {
    'onInputProp': (event) => {};
  }
  interface MSideBar {
    'header': string;
    'open': boolean;
    'triggerOpen': () => Promise<void>;
  }
  interface MSpinner {}
  interface MStock {}
  interface MTabPanel {
    'activeTab': number;
    'model': mTabPanelModel;
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
}

declare global {


  interface HTMLMFetchElement extends Components.MFetch, HTMLStencilElement {}
  var HTMLMFetchElement: {
    prototype: HTMLMFetchElement;
    new (): HTMLMFetchElement;
  };

  interface HTMLMFetchSearchElement extends Components.MFetchSearch, HTMLStencilElement {}
  var HTMLMFetchSearchElement: {
    prototype: HTMLMFetchSearchElement;
    new (): HTMLMFetchSearchElement;
  };

  interface HTMLMSideBarElement extends Components.MSideBar, HTMLStencilElement {}
  var HTMLMSideBarElement: {
    prototype: HTMLMSideBarElement;
    new (): HTMLMSideBarElement;
  };

  interface HTMLMSpinnerElement extends Components.MSpinner, HTMLStencilElement {}
  var HTMLMSpinnerElement: {
    prototype: HTMLMSpinnerElement;
    new (): HTMLMSpinnerElement;
  };

  interface HTMLMStockElement extends Components.MStock, HTMLStencilElement {}
  var HTMLMStockElement: {
    prototype: HTMLMStockElement;
    new (): HTMLMStockElement;
  };

  interface HTMLMTabPanelElement extends Components.MTabPanel, HTMLStencilElement {}
  var HTMLMTabPanelElement: {
    prototype: HTMLMTabPanelElement;
    new (): HTMLMTabPanelElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };
  interface HTMLElementTagNameMap {
    'm-fetch': HTMLMFetchElement;
    'm-fetch-search': HTMLMFetchSearchElement;
    'm-side-bar': HTMLMSideBarElement;
    'm-spinner': HTMLMSpinnerElement;
    'm-stock': HTMLMStockElement;
    'm-tab-panel': HTMLMTabPanelElement;
    'my-component': HTMLMyComponentElement;
  }
}

declare namespace LocalJSX {
  interface MFetch extends JSXBase.HTMLAttributes<HTMLMFetchElement> {
    'familyMember'?: string;
    'watchedProp'?: string;
  }
  interface MFetchSearch extends JSXBase.HTMLAttributes<HTMLMFetchSearchElement> {
    'onInputProp'?: (event) => {};
    'onMFetchSearchInputEmit'?: (event: CustomEvent<Object>) => void;
  }
  interface MSideBar extends JSXBase.HTMLAttributes<HTMLMSideBarElement> {
    'header'?: string;
    'open'?: boolean;
  }
  interface MSpinner extends JSXBase.HTMLAttributes<HTMLMSpinnerElement> {}
  interface MStock extends JSXBase.HTMLAttributes<HTMLMStockElement> {}
  interface MTabPanel extends JSXBase.HTMLAttributes<HTMLMTabPanelElement> {
    'activeTab'?: number;
    'model'?: mTabPanelModel;
    'onMTabPanelChange'?: (event: CustomEvent<any>) => void;
  }
  interface MyComponent extends JSXBase.HTMLAttributes<HTMLMyComponentElement> {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }

  interface IntrinsicElements {
    'm-fetch': MFetch;
    'm-fetch-search': MFetchSearch;
    'm-side-bar': MSideBar;
    'm-spinner': MSpinner;
    'm-stock': MStock;
    'm-tab-panel': MTabPanel;
    'my-component': MyComponent;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


