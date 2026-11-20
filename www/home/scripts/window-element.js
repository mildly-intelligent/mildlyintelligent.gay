class WindowThing extends HTMLElement {
  static observedAttributes = [ "title", "icon", "width", "height", "open" ];
  
  constructor() {
    super();
  }

  connectedCallback() {
    // jankiest possible solution but it works ig
    if (this.hasAttribute("loaded"))
      return;

    let icon = this.getAttribute("icon");
    let title = this.getAttribute("title");
    this.classList.add("window-container", "col");
    this.setAttribute("onmousedown", `focusWindow('${this.id}')"`);

    const header = document.createElement('div');
    header.id = `${this.id}header`;
    header.classList.add("row", "window-header");
      const grab = document.createElement('div');
      grab.id = `${this.id}grab`;
      grab.classList.add("row", "window-grab");
        const icon_elem = document.createElement('img');
        icon_elem.setAttribute('src', icon);
        icon_elem.id = `${this.id}icon`;
        icon_elem.classList.add("window-icon");
        grab.appendChild(icon_elem);

        const title_elem = document.createElement('span');
        title_elem.id = `${this.id}title`;
        title_elem.classList.add("window-title");
        grab.appendChild(title_elem);
      header.appendChild(grab);

      const buttons = document.createElement('div');
      buttons.classList.add("window-buttons", "row");
        const minimize = document.createElement('button');
        minimize.innerText = '🗕';
        minimize.type = 'button';
        minimize.id = `${this.id}minimize`;
        minimize.classList.add("minimize");
        minimize.setAttribute("onclick", `minimize('${this.id}')`);
        buttons.appendChild(minimize);

        const maximize = document.createElement('button');
        maximize.innerText = '🗖';
        maximize.type = 'button';
        maximize.id = `${this.id}maximize`;
        maximize.classList.add("maximize");
        maximize.setAttribute("onclick", `maximize('${this.id}')`);
        buttons.appendChild(maximize);

        const closeWindow = document.createElement('button');
        closeWindow.innerText = '🗙';
        closeWindow.type = 'button';
        closeWindow.id = `${this.id}close`;
        closeWindow.classList.add("close");
        closeWindow.setAttribute("onclick", `closeWindow('${this.id}')`);
        buttons.appendChild(closeWindow);
      header.appendChild(buttons);

    const contents = document.createElement('div');
    contents.classList.add("window-contents");
    contents.innerHTML = this.innerHTML;

    this.innerHTML = header.outerHTML + contents.outerHTML;
    this.toggleAttribute("loaded", true);

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