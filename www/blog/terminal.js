{

var PWD = "~";

function evaluate(cmd) {
    let tokens = cmd.split(' ');
    let command = tokens[0];
    let args = tokens.slice(1);

    switch (command) {
        case 'help':
            return evalHelp(args[0]);
            break;
        case 'ls':
            return evalLs(args);
            break;
    }
}

/** @type {HTMLInputElement} */
const input = document.getElementById("terminalinput");
function handle() {
    let stdout = evaluate(input.value).replaceAll('\n', '<br>');

    console.log(input.value, stdout)

    const terminal = document.getElementById("terminal");
    const newline = document.createElement('div');
    newline.innerHTML = `<span class="powerline symbol">[</span>
        <span class="powerline username">maya</span>
        <span class="powerline symbol">@</span>
        <span class="powerline hostname">mildlyintelligent.gay</span>
        <span class="powerline symbol">in</span>
        <span class="powerline location">~</span>
        <span class="powerline symbol">]</span><span class="powerline dollarsign">$</span>
        <span class="cmd">${input.value}</span><br>
        <div class="stdout">${stdout}</div>`
    terminal.appendChild(newline);
    document.getElementById("activecommand");

    input.value = "";
}

input.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
        handle();
    }
});

/** @param {string?} cmd  */
function evalHelp(cmd) {
    switch (cmd) {
        case "help": return `help <cmd?>
                            gives usage information on a given command.
                            if <cmd> is omitted, print a list of commands.`;
        default: return `MaSH v1.0
                        The following is a list of commands and their function.
                        Type \`help $cmd\` to find out more about the command.
                        - help - Prints this menu.`;
    }
}

function evalLs() {

}

}