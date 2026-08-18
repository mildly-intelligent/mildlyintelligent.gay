class DesktopIcon extends HTMLElement {
  static observedAttributes = [ "src", "text", "windowID", "href" ];

  constructor() {
    super();
  }

  connectedCallback() {
    let windowID = this.getAttribute("windowID");
    let href = this.getAttribute("href");
    /** @type {{type: 'window'|'link'|'none', target: string, js: string}} */
    let action = {};

    if (windowID !== null) {
      action.type = "window";
      action.target = windowID;
    } else if (href !== null) {
      action.type = "link";
      action.target = href;
    } else {
      action.type = "none";
      action.target = null;
    }

    let attrs = {
      src: this.getAttribute("src"),
      text: this.getAttribute("text"),
      action: action,
    };

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement('div');

    const icon = document.createElement('img');
    icon.setAttribute("src", attrs.src);
    
    if (attrs.action.type == 'window') {
      icon.setAttribute("ondblclick", "openWindow('" + attrs.action.target + "')");
      wrapper.appendChild(icon);
    } else if (attrs.action.type == 'link') {
      const link = document.createElement('a');
      link.setAttribute("href", attrs.action.target);
      link.classList.add("shortcut");

      const shortcut = document.createElement('img');
      shortcut.setAttribute("src", "/home/shortcut.png");
      shortcut.style.position = 'absolute';
      
      link.appendChild(icon);
      link.appendChild(shortcut);
      wrapper.appendChild(link);
    }

    const span = document.createElement('span');
    // span.classList.add("desktop-icon-span")
    span.innerText = attrs.text;

    wrapper.appendChild(span);

    const style = document.createElement('style');
    style.textContent = `
      div {
        display: flex;
        flex-direction: column;
      }
      img {
        width: 64px;
        height: 64px;
        margin: 8px;
        image-rendering: pixelated;
      }
      a {
        all: inherit;
      }
      span {
        font-size: 14pt;
        color: white;
        background-color: #222b;
        padding: 0px 4px 2px 4px;
        text-align: center;
        width: fit-content;
        align-self: center;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

customElements.define("desktop-icon", DesktopIcon);
