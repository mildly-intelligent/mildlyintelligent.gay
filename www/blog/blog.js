const terminal = document.getElementById("terminal-wrapper");
const blog = document.getElementById("blog-wrapper");
const content = document.getElementById("content-wrapper");
function openBlogPost() {
    let post = window.location.pathname.split('/').findLast();
    if (post.match(/^[a-zA-Z0-9\-]+$/)) {
        let filepath = `/blog/posts/${post}.html`;

        terminal.hidden = true;
        blog.hidden = false;

        document.getElementById("blog-header").textContent = `File: ~/Documents/${post}.html`;

        fetch(filepath)
            .then(response => response.text())
            .then(text => { content.innerHTML = text; })
            .then(_ => { renderEmojis(); });

        document.onkeydown = (e) => {
            if (e.code === 'KeyQ') {
                window.location.pathname = window.location.pathname.split('/').slice(0, -1);
                terminal.hidden = false;
                blog.hidden = true;
                document.onkeydown = undefined;
                document.getElementById("terminalinput").focus();
            }
        };
    }
}

openBlogPost();