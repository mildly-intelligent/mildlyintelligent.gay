/**
 * @typedef {{title:string, date:Date, edited:Date?, size:string}} Post
 */

const terminal = document.getElementById("terminal-wrapper");
const blog = document.getElementById("blog-wrapper");
const content = document.getElementById("content-wrapper");
function openBlogPost() {
    var postName = window.location.search.slice(1);
    if (postName.match(/^[a-zA-Z0-9\-]+$/)) {
        let filepath = `/blog/posts/${postName}.html`;

        terminal.hidden = true;
        blog.hidden = false;

        /** @type {Promise<Post>} */
        fetch("/blog/blog.json")
            .then(response => response.text())
            .then(text => JSON.parse(text))
            .then(json => json.posts)
            .then(posts => posts.filter(obj => obj.title.toLowerCase().replaceAll(' ', '-') == postName)[0])
            .then(post => {
                let header = document.getElementById("blog-header");
                header.textContent = `File: ~/Documents/${postName}.html   Size: ${post.size}`;
                header.textContent += `        Written by Maya D. on ${post.date}`;
                if (post.edited) { header.textContent += ` Revised as recently as ${post.edited}`; }

                return post;
            });

        

        fetch(filepath)
            .then(response => response.text())
            .then(text => { content.innerHTML = text; })
            .then(_ => { renderEmojis(); })
            .then(_ => {
                let headings = document.querySelectorAll('h1,h2,h3');
                for (const heading of headings) {
                    let id = heading.textContent.toLowerCase().replaceAll(' ', '_');
                    heading.setAttribute('id', id);
                    heading.innerHTML = `<a class="anchor" href="#${id}">${heading.textContent}</a>`;
                }
            });

        document.onkeydown = (e) => {
            if (e.code === 'KeyQ') {
                window.location.search = "";
                terminal.hidden = false;
                blog.hidden = true;
                document.onkeydown = undefined;
                document.getElementById("terminalinput").focus();
            }
        };
    }
}

openBlogPost();