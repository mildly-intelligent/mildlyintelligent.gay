class DesktopIcon extends HTMLElement {
  static observedAttributes = [ "src", "text", "windowID", "badge", "href" ];

  constructor() {
    super();
  }

  async connectedCallback() {
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

    const wrapper = document.createElement('div');
    wrapper.classList.add("col", "desktop-icon");

    const icon = document.createElement('div');
    icon.classList.add("overlay");

    const img = document.createElement('img');
    img.setAttribute('src', attrs.src);
    img.classList.add("desktop-icon-img");
    icon.appendChild(img);
  
    if (attrs.action.type == 'window') {
      icon.setAttribute('ondblclick', `openWindow('${attrs.action.target}')`);
    } else if (attrs.action.type == 'link') {
      icon.setAttribute('ondblclick', `window.location.href="${action.target}";`);

      const shortcut = document.createElement('img');
      shortcut.setAttribute("src", "/home/shortcut.png");
      shortcut.classList.add("desktop-icon-shortcut");
      icon.appendChild(shortcut);
    }

    // This is nasty
    const badge = (async (n)=>typeof(n)==='string'?await window[n]:(n>0?n*2-1:null))(this.getAttribute('badges'))
      .then(a => {
        if (a !== null) {
          const badge = document.createElement('img');
          badge.setAttribute('src', `https://cdn.jsdelivr.net/gh/React95/React95@master/packages/icons/png/Gcdef100${String(a).padStart(2,'0')}_32x32_4.png`)
          badge.classList.add("desktop-icon-badge");
          // icon.appendChild(badge);
          return badge;
        }
      });
    if (await badge) icon.appendChild(await badge);
    
    wrapper.appendChild(icon);

    const span = document.createElement('span');
    span.innerText = attrs.text;
    span.classList.add("desktop-icon-text");

    wrapper.appendChild(span);

    this.innerHTML = wrapper.outerHTML
  }
}

customElements.define("desktop-icon", DesktopIcon);
