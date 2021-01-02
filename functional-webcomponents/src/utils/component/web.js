const component = name => base => {
  class Base extends HTMLElement {
    constructor() {
      super();
      Object.defineProperty(this, "props", {
        get: () => base.getProps(),
        set: fn => base.setProps(this, fn)
      });
    }

    connectedCallback() {
      base.mounted && base.mounted(this);
    }

    disconnectedCallback() {
      base.unmounted && base.unmounted(this);
    }
  }

  customElements.define(name, Base);
};

export default component;
