class DesktopIcon extends HTMLElement {
  static observedAttributes = [ "src", "text", "href", "action" ];

  constructor() {
    super();
  }

  connectedCallback() {
    let attrs = {
      src: this.getAttribute("src"),
      text: this.getAttribute("text"),
      href: this.getAttribute("href"),
      action: this.getAttribute("action"),
    };

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement('div');

    const icon = document.createElement('img');
    // icon.classList.add("desktop-icon-img");
    icon.setAttribute("src", attrs.src);
    if (attrs.action !== null) {
      icon.setAttribute("ondblclick", attrs.action);
    }

    if (attrs.href !== null) {
      const link = document.createElement('a');
      link.setAttribute("href", attrs.href);
      
      link.appendChild(icon);
      wrapper.appendChild(link);
    } else {
      wrapper.appendChild(icon);
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
        font-size: xx-small;
        color: white;
        background-color: #222;
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
