let badges = fetch('/home/88x31.json')
    .then(response => response.text())
    .then(json => JSON.parse(json));

/**
 * @param {string} img 
 * @param {string} href 
 * @returns {HTMLElement}
*/
function entryToElem(img, href) {
    if (!img.startsWith('http')) {
        img = "/home/88x31/" + img;
    }

    if (href === null) {
        const badge = document.createElement('img');
        badge.setAttribute("src", img);
        badge.classList.add("boring", "badge");
        
        return badge;
    } else {
        const link = document.createElement('a');
        link.setAttribute("href", href);

        const badge = document.createElement('img');
        badge.setAttribute("src", img);
        badge.classList.add("cool", "badge");
        // Random duration from 450ms to 550ms
        badge.style.animationDuration = (450 + Math.random()*100) + "ms";
        link.appendChild(badge);

        return link;
    }
}

{
    const sites = document.getElementById('badgecontainersites');
    badges.then(json => Object.entries(json.sites))
        .then(entries => {
            for (const [img, url] of entries) {
                sites.appendChild(entryToElem(img, url));
            }
        })

    const misc = document.getElementById('badgecontainermisc');
    badges.then(json => Object.entries(json.misc))
        .then(entries => {
            for (const [img, url] of entries) {
                misc.appendChild(entryToElem(img, url));
            }
        })
}


