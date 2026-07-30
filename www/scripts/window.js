/**
 * @type {Object.<string, {title: string, x: number, y: number, z: number, width: number, height: number, open: boolean, minimized: boolean, maximized: boolean}>}
 */
var windowState = {
    // "window1": {
    //     title: "",
    //     rect: {
    //         x: 0,
    //         y: 0,
    //         width: 0,
    //         height: 0,
    //     },
    //     z: 0,
    //     open: true,
    //     minimized: false,
    //     maximized: false,
    // },
}

function initWindow(windowID, state) {
    let window = document.getElementById(windowID);
    
    state.title ??= "Untitled";
    state.rect.x ??= window.getBoundingClientRect().x;
    state.rect.y ??= window.getBoundingClientRect().y;
    state.rect.width ??= window.getBoundingClientRect().width;
    state.rect.height ??= window.getBoundingClientRect().height;
    state.z ??= 0;
    state.open ??= true;
    state.minimized ??= false;
    state.maximized ??= false;

    dragElement(window);
    document.getElementById(windowID + "title").innerText = state.title;

    windowState[windowID] = state;

    updateWindows();
}

function updateWindows() {
    const taskbar = document.getElementById("taskbar");

    while(taskbar.firstChild !== taskbar.lastChild) {
        taskbar.removeChild(taskbar.lastChild);
    }

    for (const [windowID, state] of Object.entries(windowState)) {
        let window = document.getElementById(windowID);
        
        document.getElementById(windowID + "title").innerText = state.title;

        state.rect.x = window.getBoundingClientRect().x;
        state.rect.y = window.getBoundingClientRect().y;
        state.rect.width = window.getBoundingClientRect().width;
        state.rect.height = window.getBoundingClientRect().height;

        if (state.minimized || !state.open) {
            window.style.visibility = "hidden";
        } else {
            window.style.visibility = "visible";
        }
        
        if (state.maximized) {
            window.style.top = "0px";
            window.style.left = "0px";
            window.style.width = "100%";
            window.style.height = "100%"
        } else {
            window.style.left = `${state.rect.x}px`;
            window.style.top = `${state.rect.y}px`;
            window.style.width = `${state.rect.width}px`;
            window.style.height = `${state.rect.height}px`;
        }

        if (state.open) {
            const taskbarItem = document.createElement('span');
            taskbarItem.innerText = state.title;
            taskbarItem.setAttribute("id", windowID + "taskbar");
            taskbarItem.setAttribute("class", "taskbar-item");
            taskbarItem.setAttribute("onclick", "restore('" + windowID + "')")
            taskbar.appendChild(taskbarItem);
        }
    }
}


/**
 * @param {number} windowID
 */
function minimize(windowID) {
    windowState[windowID].minimized = true;
    updateWindows();
}

function restore(windowID) {
    windowState[windowID].minimized = false;
    updateWindows();
}

/**
 * @param {number} windowID
 */
function maximize(windowID) {
    let window = document.getElementById(windowID);
    let button = document.getElementById(windowID + "maximize");
    
    if (windowState[windowID].maximized) {
        windowState[windowID].maximized = false;
        button.innerHTML = "<img src=\"/www/images/ui/maximize.png\">";
    } else {
        windowState[windowID].maximized = true;
        button.innerHTML = "<img src=\"/www/images/ui/restore.png\">";

        windowState[windowID].rect.x = window.getBoundingClientRect().x || 0;
        windowState[windowID].rect.y = window.getBoundingClientRect().y || 0;
        windowState[windowID].rect.width = window.getBoundingClientRect().width || 100;
        windowState[windowID].rect.height = window.getBoundingClientRect().height || 100;
    }

    updateWindows();
}

function closeWindow(windowID) {
    windowState[windowID].open = false;
    updateWindows();
}