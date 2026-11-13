const changelog = [
    {
        date: 1792296000,
        html: "I added a changelog to the website!!"
    },
];

var changelog_count;
{
    changelog_count = changelog.filter(a => getCookie("lastVisited") < a.date*1000).length;

    const list = document.getElementById("changelog-list");
    for (let change of changelog.reverse()) {
        const item = document.createElement('li');
        let dt = new Date(change.date * 1000);
        item.innerHTML = `
            <h2>${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}</h2>
            ${change.html}
        `;
        list.appendChild(item);
    }
}