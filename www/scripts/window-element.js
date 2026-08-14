class WindowThing extends HTMLElement {
  static observedAttributes = [ "title", "icon", "width", "height", "open" ];
  
  constructor() {
    super();
  }

  connectedCallback() {
    let icon = this.getAttribute("icon");
    this.outerHTML = `
      <div class="window-container col" id="${this.id}" onmousedown="focusWindow('${this.id}')">
        <div class="window-header row" id="${this.id}header">
          <img src="${icon}" class="window-icon" id="${this.id}icon">
          <span class="window-title" id="${this.id}title"></span>
          <div style="flex-grow: 1000;"></div>
          <button class="window-buttons minimize" id="${this.id}minimize" type="button" onclick="minimize('${this.id}')">🗕</button>
          <button class="window-buttons maximize" id="${this.id}maximize" type="button" onclick="maximize('${this.id}')">🗖</button>
          <button class="window-buttons close" id="${this.id}close" type="button" onclick="closeWindow('${this.id}')">🗙</button>
        </div>
        <div class="window-contents">
          ${this.innerHTML}
        </div>
      </div>
    `;
    let title = this.getAttribute("title");
    let state = {
      title: title == "" ? "Untitled" : title,
      icon: icon,
      rect: {
        x: undefined,
        y: undefined,
        w: this.getAttribute('width'),
        h: this.getAttribute('height'),
      },
      z: undefined,
      open: this.getAttribute('open') ?? false,
      minimized: false,
      maximized: false,
    };

    initWindow(this.id, state);
  }
}

customElements.define("window-elmt", WindowThing);