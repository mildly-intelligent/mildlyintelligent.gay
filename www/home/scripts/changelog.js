var changelog_count;
async function get_changelog() {
    let changelog = await fetch("/home/changelog.json")
        .then(response => response.text())
        .then(text => JSON.parse(text));
    changelog_count = changelog.filter(a => getCookie("lastVisited") < a.date*1000).length;

    const list = document.getElementById("changelog-list");
    // changelog.then(changelog => {
        for (let change of changelog.reverse()) {
            const item = document.createElement('li');
            let dt = new Date(change.date * 1000);
            item.innerHTML = `
                <h2>${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}</h2>
                ${change.html}
            `;
            list.appendChild(item);
        }
    // });
}

get_changelog()