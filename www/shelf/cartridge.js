class GameCartridge extends HTMLElement {
    static observedAttributes = [ "gameID", "onclick" ];

    constructor() {
        super();
    }

    connectedCallback() {
        let gameID = this.getAttribute("gameID");
        let onclick = this.getAttribute("onclick");

        const cartridge = document.createElement('button');
        cartridge.classList.add("row", "cartridge");
        cartridge.onclick = onclick;

        const cart = document.createElement('img');
        cart.classList.add("cart");
        cart.src = "./cartridge.webp";

        const sticker = document.createElement('img');
        sticker.classList.add("sticker");
        sticker.src = `https://shared.steamstatic.com/store_item_assets/steam/apps/${gameID}/hero_capsule.jpg`;

        cartridge.appendChild(cart);
        cartridge.appendChild(sticker);

        this.outerHTML = cartridge.outerHTML;
    }
}

customElements.define("game-cartridge", GameCartridge);