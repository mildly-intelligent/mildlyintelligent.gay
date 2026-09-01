{

const container = document.getElementById("microblogcontents");

let posts = fetch("/home/microblog.json")
    .then(response => response.text())
    .then(text => JSON.parse(text))
    .then(json => {
        console.log(json)
        for (const post of json) {
            console.log(post)
            container.innerHTML += `
                <div class="microblog-post">
                <span class="microblog-date">${post.date}</span>
                    <p class="microblog-text">${post.text}</p>
                </div>
            `;
        }
    });
    
}
