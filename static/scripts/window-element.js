class WindowThing extends HTMLElement {
  static observedAttributes = [ "title", "width", "height" ];
  
  constructor() {
      super();
  }

  connectedCallback() {
    this.outerHTML = `
      <div class="window-container col" id="${this.id}">
        <div class="window-header row" id="${this.id}header">
          <span id="${this.id}title"></span>
          <div style="flex-grow: 1000;"></div>
          <button class="window-buttons" id="${this.id}minimize" type="button" onclick="minimize('${this.id}')">🗕</button>
          <button class="window-buttons" id="${this.id}maximize" type="button" onclick="maximize('${this.id}')">🗖</button>
          <button class="window-buttons" id="${this.id}close" type="button" onclick="closeWindow('${this.id}')">🗙</button>
        </div>
        <div class="window-contents">
          ${this.innerHTML}
        </div>
      </div>
    `;
    let title = this.getAttribute("title");
    let width = this.getAttribute("width");
    let height = this.getAttribute("height");
    let state = {
      title: title == "" ? null : title,
      x: null,
      y: null,
      z: null,
      width: width == "" ? null : width,
      height: height == "" ? null : height,
      open: true,
      minimized: null,
      maximized: null,
    };

    initWindow(this.id, state);
  }
}

customElements.define("window-elmt", WindowThing);