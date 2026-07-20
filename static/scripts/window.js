/**
 * @type {Object.<string, {title: string, x: number, y: number, z: number, width: number, height: number, open: boolean, minimized: boolean, maximized: boolean}>}
 */
var windowState = {
    "window1": {
        title: "",
        x: 0,
        y: 0,
        z: 0,
        width: 0,
        height: 0,
        open: true,
        minimized: false,
        maximized: false,
    },
}

function initWindows() {
    for (const [windowID, state] of Object.entries(windowState)) {
        let window = document.getElementById(windowID);
        
        state.title = document.getElementById(windowID + "title").innerText;
        state.x = window.getBoundingClientRect().x || 0;
        state.y = window.getBoundingClientRect().y || 0;
        state.z = 0;
        state.width = window.getBoundingClientRect().width || 100;
        state.height = window.getBoundingClientRect().height || 100;
        state.open = true;
        state.minimized = false;
        state.maximized = false;

        dragElement(window);
    }

    updateWindows();
}

function updateWindows() {
    const taskbar = document.getElementById("taskbar");

    for (const [windowID, state] of Object.entries(windowState)) {
        let window = document.getElementById(windowID);

        document.getElementById(windowID + "title").innerText = state.title;
        
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
            window.style.left = `${state.x}px`;
            window.style.top = `${state.y}px`;
            window.style.width = `${state.width}px`;
            window.style.height = `${state.height}px`;
        }

        const taskbarItem = document.createElement('span');
        taskbarItem.innerText = state.title;
        taskbarItem.setAttribute("id", windowID + "taskbar");
        taskbarItem.setAttribute("class", "taskbar-item");
        taskbar.appendChild(taskbarItem);
    }
}


/**
 * @param {number} windowID
 */
function minimize(windowID) {
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
    } else {
        windowState[windowID].maximized = true;
        button.innerText = "🗗";

        windowState[windowID].x = window.getBoundingClientRect().x || 0;
        windowState[windowID].y = window.getBoundingClientRect().y || 0;
        windowState[windowID].width = window.getBoundingClientRect().width || 100;
        windowState[windowID].height = window.getBoundingClientRect().height || 100;
    }

    updateWindows();
}

function closeWindow(windowID) {
    windowState[windowID].open = false;
    updateWindows();
}