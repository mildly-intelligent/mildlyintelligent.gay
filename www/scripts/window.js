/**
 * @type {Object.<string, {title: string, icon: string, rect: {x: number, y: number, width: number, height: number}, z: number, open: boolean, minimized: boolean, maximized: boolean}>}
 */
var windowState = {}
/**
 * @type {number}
 */
var numWindows = 0;

function initWindow(windowID, state) {
    let window = document.getElementById(windowID);

    console.log(state.rect);

    if (state.rect.width !== null) {
        window.style.width = state.rect.width;
    }
    if (state.rect.height !== null) {
        window.style.height = state.rect.height;
    }
    
    state.title ??= "Untitled";
    state.icon ??= "";
    state.rect.x ??= window.getBoundingClientRect().x;
    state.rect.y ??= window.getBoundingClientRect().y;
    state.rect.width ??= window.getBoundingClientRect().width;
    state.rect.height ??= window.getBoundingClientRect().height;
    state.z ??= numWindows;
    state.open ??= true;
    state.minimized ??= false;
    state.maximized ??= false;

    dragElement(window);
    document.getElementById(windowID + "title").innerText = state.title;

    windowState[windowID] = state;

    numWindows++;

    updateWindows();
}

function updateWindows() {
    const taskbar = document.getElementById("taskbar");

    while(taskbar.firstChild !== taskbar.lastChild) {
        taskbar.removeChild(taskbar.lastChild);
    }
    
    for (const [windowID, state] of Object.entries(windowState)) {
        let window = document.getElementById(windowID);

        window.style.zIndex = state.z;
        
        document.getElementById(windowID + "title").innerText = state.title;
        document.getElementById(windowID + "icon").setAttribute("src", state.icon);

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
            window.style.height = "100%";
        } else {
            window.style.left = `${state.rect.x}px`;
            window.style.top = `${state.rect.y}px`;
            window.style.width = `${state.rect.width}px`;
            window.style.height = `${state.rect.height}px`;
        }

        if (state.open) {
            const taskbarItem = document.createElement('img');
            taskbarItem.setAttribute("src", state.icon);
            taskbarItem.setAttribute("title", state.title);
            taskbarItem.setAttribute("id", windowID + "taskbar");
            taskbarItem.setAttribute("class", "taskbar-item");
            taskbarItem.setAttribute("onclick", "restore('" + windowID + "');" + "focusWindow('" + windowID + "')");
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
        button.innerText = "🗖";

        window.style.left = `${windowState[windowID].rect.x}px`;
        window.style.top = `${windowState[windowID].rect.y}px`;
        window.style.width = `${windowState[windowID].rect.width}px`;
        window.style.height = `${windowState[windowID].rect.height}px`;
    } else {
        windowState[windowID].maximized = true;
        button.innerText = "🗗";

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
function openWindow(windowID) {
    windowState[windowID].open = true;
    focusWindow(windowID);
}

function focusWindow(windowID) {
    let i = 0;
    for (const [ID, state] of Object.entries(windowState)) {
        if (ID == windowID) { continue; }
        state.z = i;
        i++;
    }
    windowState[windowID].z = i;

    updateWindows();
}