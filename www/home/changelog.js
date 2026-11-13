const changelog = [
    {
        date: 3254634654,
        html: "jflsajf"
    },
    {
        date: 3254434654,
        html: "jflsajf"
    }
];

var changelog_count;
{
    changelog_count = changelog.filter(a => getCookie("lastVisited") < a.date*1000).length;

    const list = document.getElementById("changelog-list");
    for (let change of changelog) {
        const item = document.createElement('li');
        let dt = new Date(change.date * 1000);
        item.innerHTML = `
            <h2>${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}</h2>
            <p>${change.html}</p>
        `;
        list.appendChild(item);
    }
}