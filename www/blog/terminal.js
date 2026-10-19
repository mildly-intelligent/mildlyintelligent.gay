{

/** @type {HTMLInputElement} */
const input = document.getElementById("terminalinput");

input.addEventListener('keypress', (e) => {
    if (e.code === "Enter") {
        handle();
    }
});

function err(msg) {
    return `<span class="err">${msg}</span>`;
}

async function handle() {
    let stdout = await evaluate(input.value);

    const terminal = document.getElementById("terminal");
    if (stdout == "Super secret string that clears the terminal") {
        terminal.innerHTML = "";
    } else {
        const newline = document.createElement('div');
        newline.innerHTML = `<span class="powerline symbol">[</span>
            <span class="powerline username">maya</span>
            <span class="powerline symbol">@</span>
            <span class="powerline hostname">mildlyintelligent.gay</span>
            <span class="powerline symbol">in</span>
            <span class="powerline location">~/Documents/</span>
            <span class="powerline symbol">] </span><span class="powerline dollarsign">$</span>
            <span class="cmd">${input.value}</span>`;
        if (stdout !== null) {
            newline.innerHTML += `<div class="stdout"><pre>${stdout.replaceAll('\n', '<br>')}</pre></div>`;
        }
        terminal.appendChild(newline);
    }

    input.value = "";
}

async function evaluate(cmd) {
    let tokens = cmd.split(' ');
    let command = tokens[0];
    let args = tokens.slice(1);

    switch (command) {
        case 'help':
            return evalHelp(args[0]);
        case 'ls':
            return await evalLs(args);
        case 'cat':
            return evalCat(args[0]);
        case 'exit':
            window.location.href = "/home"; return null;
        case 'clear':
        case 'clera':
            // To quote Tom Scott, "I'm bodging it" or smth idk
            return "Super secret string that clears the terminal";
        case 'cd':
            return err("so i tried doing that and realized thats WAYYY more effort than its worth, sorry!");
        case 'echo':
            return args.join(' ');
        case 'cowsay':
            return ` ________\n< Hai :3 >\n --------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
        default:
            return err(`error: command '${command}' not found!`);
    }
}


/** @param {string?} cmd  */
function evalHelp(cmd) {
    if (cmd === undefined) {
        cmd = "reallylongmessagethatnoonewilleverguess";
    }
    switch (cmd) {
        case "help":
        return `<strong>help</strong> [COMMAND?]
gives usage information on a given command.
if <cmd> is omitted, print a list of commands.`;

        case "exit":
        return `<strong>exit</strong>
exits the terminal application.`

        case "ls":
        return `<strong>ls</strong> [OPTIONS?]
lists all files in current directory
flags:
<strong>--all</strong>
    show hidden files
<strong>--long</strong>
    provide detailed about files`
        
        case "cat":
        return `<strong>cat</strong> [FILEPATH]
opens a file for viewing (yes i know that this would realistically be smth like 'more' or 'less' but stfu.)
press 'Q' at any time to return to the terminal.`;

        case "echo":
        return "You really need help with the <i>echo</i> command?!"

        // I'm a proffessional (why the hell did i do that???)
        case "reallylongmessagethatnoonewilleverguess":
        return `MASH v1.1
The following is a list of commands and their function.
Type \`help $cmd\` to find out more about the command.
* 'help' - prints this menu.
* 'exit' - exits the terminal.
* 'clear' - clears all text on the terminal.
* 'ls' - lists all files in current directory.
* 'cat' - opens a file for viewing.
* 'echo' - echos text back at you.`;
        
        default:
        return err(`error: no hep info for command '${cmd}'!`);
    }
}

/** @param {string} flags  */
async function evalLs(flags) {
    var all_flag, long_flag = false;
    for (const flag of flags) {
        switch (flag) {
            case "-a":
            case "--all":
                all_flag = true;
                break;
            case "-l":
            case "--long":
                long_flag = true;
                break;
            case "-al":
            case "-la":
                all_flag, long_flag = true;
                break;
        }
    }

    /** @type {Promise<{title:string, date:Date, edited:Date?, size:string}[]>} */
    let posts = fetch("/blog/blog.json")
        .then(response => response.text())
        .then(text => JSON.parse(text))
        .then(json => json.posts);

    return await posts.then(posts => {
        let output = "";

        if (long_flag) {
            output += "<u>Permissions</u> <u>User</u> <u> Modified </u> <u>Size</u> <u> Name         </u>\n"
        }

        for (const post of posts) {
            let filename = post.title.toLowerCase().replaceAll(' ', '-');
            let sizeUnit = 'b'
            if (post.size.includes('MB')) { sizeUnit = 'mb'; }
            else if (post.size.includes('KB')) { sizeUnit = 'kb'; }

            if (long_flag) {
                output += `<span class="perm-dot">.</span><span class="perms-r">r</span><span class="perms-w">w</span><span class="perms-no">-</span><span class="perms-r">r</span><span class="perms-w">w</span><span class="perms-no">-</span><span class="perms-r">r</span><span class="perms-no">--</span>  `;
                output += `<span class="owner">maya</span> `;
                output += `<span class="date-modified">${(post.edited ?? post.date)}</span> `;
                output += `<span class="size-${sizeUnit}">${post.size}</span> `;
                output += `<span class="file-normal"><a href="?${filename}">${filename}.odt</a></span> `;
            } else {
                output += `<span class="file-normal"><a href="?${filename}">${filename}.odt</a></span> `;
            }
        }

        return output;
    });
}

/** @param {string} path  */
function evalCat(path) {
    let filepath = path.split('.')[0];
    window.location.search = filepath;
    return null;
}

}