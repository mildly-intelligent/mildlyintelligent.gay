class WindowThing extends HTMLElement {
  static observedAttributes = [ "title", "icon", "width", "height", "open" ];
  
  constructor() {
    super();
  }

  connectedCallback() {
    let icon = this.getAttribute("icon");
    let title = this.getAttribute("title");
    this.classList.add("window-container", "col");
    this.setAttribute("onmousedown", `focusWindow('${this.id}')"`);

    // const header = document.createElement('div');
    // header.id = `${this.id}header`;
    // header.classList.add("row", "window-header");
    //   const img = document.createElement('img');
    //   img.setAttribute('src', icon);
    //   img.id = `${this.id}icon`;
    //   img.classList.add("window-icon");
    //   const title_elem = document.createElement('span');
    //   title_elem.id = `${this.id}title`;
    //   title_elem.classList.add("window-title");

    this.innerHTML = `
      <div class="window-header row" id="${this.id}header">
        <div class="window-grab row" id="${this.id}grab">
          <img src="${icon}" class="window-icon" id="${this.id}icon">
          <span class="window-title" id="${this.id}title"></span>
        </div>
        <div class="window-buttons row">
          <button class="minimize" id="${this.id}minimize" type="button" onclick="minimize('${this.id}')">🗕</button>
          <button class="maximize" id="${this.id}maximize" type="button" onclick="maximize('${this.id}')">🗖</button>
          <button class="close" id="${this.id}close" type="button" onclick="closeWindow('${this.id}')">🗙</button>
        </div>
      </div>
      <div class="window-contents">
        ${this.innerHTML}
      </div>
    `;

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
      open: this.hasAttribute('open'),
      minimized: false,
      maximized: false,
    };

    initWindow(this.id, state);
  }
}

customElements.define("window-elem", WindowThing);