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
          <img src="/www/images/ui/minimize.png" class="window-buttons minimize" id="${this.id}minimize" type="button" onclick="minimize('${this.id}')">
          <img src="/www/images/ui/maximize.png" class="window-buttons maximize" id="${this.id}maximize" type="button" onclick="maximize('${this.id}')">
          <img src="/www/images/ui/close.png" class="window-buttons close" id="${this.id}close" type="button" onclick="closeWindow('${this.id}')">
        </div>
        <div class="window-contents">
          ${this.innerHTML}
        </div>
      </div>
    `;
    let title = this.getAttribute("title");
    let state = {
      title: title == "" ? "Untitled" : title,
      rect: {
        x: null,
        y: null,
        width: null,
        height: null,
      },
      z: null,
      open: true,
      minimized: null,
      maximized: null,
    };

    initWindow(this.id, state);
  }
}

customElements.define("window-elmt", WindowThing);