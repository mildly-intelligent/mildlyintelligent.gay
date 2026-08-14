/**
 * @typedef Rect
 * @type {Object}
 * @property {number} x x coordinate of the window
 * @property {number} y y coordinate of the window
 * @property {number} w width of window
 * @property {number} h height of window
 */
/**
 * @typedef State
 * @type {Object}
 * @property {string} title Title of the window
 * @property {string} icon Url to the window icon
 * @property {Rect} rect Bounding information about the window
 * @property {number} z Z-index of the window
 * @property {boolean} open Is open?
 * @property {boolean} maximized Is maximized?
 * @property {boolean} minimized Is minimized?
 * @property {boolean} wasMaximizedLastUpdate Was maximized at the end of last `updateWindows` call
 */

/**
 * @type {Object.<string, State>}
 */
var windowState = {}
var numWindows = 0;

/**
 * @param {string} windowID 
 */
function randomPlaceWindow(windowID) {
    let window = document.getElementById(windowID);
    let state = windowState[windowID];

    let desktop = document.getElementById("desktop").getBoundingClientRect();
    let placementRangeXMax = desktop.width - state.rect.w;
    let placementRangeYMax = desktop.height - state.rect.h;
    console.log(windowID, placementRangeXMax, placementRangeYMax);

    state.rect.x = Math.random() * placementRangeXMax;
    window.style.left = `${state.rect.x}px`;
    state.rect.y = Math.random() * placementRangeYMax;
    window.style.top = `${state.rect.y}px`;
    console.log(windowID, state.rect.x, state.rect.y);

    updateWindowPos(windowID);
}

/**
 * @param {string} windowID 
 * @param {State} state 
 */
function initWindow(windowID, state) {
    let window = document.getElementById(windowID);

    if (state.rect.w !== null) {
        window.style.width = state.rect.w;
    }
    if (state.rect.h !== null) {
        window.style.height = state.rect.h;
    }
    
    state.rect.w ??= window.getBoundingClientRect().width;
    state.rect.h ??= window.getBoundingClientRect().height;
    state.z = numWindows;
    state.wasMaximizedLastUpdate = false;

    dragElement(window);
    document.getElementById(windowID + "title").innerText = state.title;

    windowState[windowID] = state;

    numWindows++;

    updateWindows();
    
    randomPlaceWindow(windowID);
}

function updateWindowPos(windowID) {
    let window = document.getElementById(windowID);
    let state = windowState[windowID];

    if (state.minimized || !state.open) {
        window.style.visibility = "hidden";
    } else {
        window.style.visibility = "visible";
    }
    
    if (!state.wasMaximizedLastUpdate) {
        state.rect.x = window.getBoundingClientRect().x;
        state.rect.y = window.getBoundingClientRect().y;
        state.rect.w = window.getBoundingClientRect().width;
        state.rect.h = window.getBoundingClientRect().height;
    }

    if (state.maximized) {
        window.style.top = "0px";
        window.style.left = "0px";
        window.style.width = "100%";
        window.style.height = "100%";
        state.wasMaximizedLastUpdate = true;
    } else {
        window.style.left = `${state.rect.x}px`;
        window.style.top = `${state.rect.y}px`;
        window.style.width = `${state.rect.w}px`;
        window.style.height = `${state.rect.h}px`;
        state.wasMaximizedLastUpdate = false;
    }
}

function updateWindows() {
    const taskbar = document.getElementById("taskbar");
    while (taskbar.children.length > 1) {
        taskbar.removeChild(taskbar.lastChild);
    }
    
    for (const [windowID, state] of Object.entries(windowState)) {
        let window = document.getElementById(windowID);

        window.style.zIndex = state.z + 1;
        
        document.getElementById(windowID + "title").innerText = state.title;
        document.getElementById(windowID + "icon").setAttribute("src", state.icon);

        updateWindowPos(windowID);

        if (state.open) {
            const taskbarItem = document.createElement('img');
            taskbarItem.setAttribute("src", state.icon);
            taskbarItem.setAttribute("title", state.title);
            taskbarItem.setAttribute("id", windowID + "taskbar");
            taskbarItem.setAttribute("class", "taskbar-item");
            taskbarItem.setAttribute("onclick", "restore('" + windowID + "')");
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
        window.style.width = `${windowState[windowID].rect.w}px`;
        window.style.height = `${windowState[windowID].rect.h}px`;
    } else {
        windowState[windowID].maximized = true;
        button.innerText = "🗗";

        windowState[windowID].rect.x = window.getBoundingClientRect().x || 0;
        windowState[windowID].rect.y = window.getBoundingClientRect().y || 0;
        windowState[windowID].rect.w = window.getBoundingClientRect().width || 100;
        windowState[windowID].rect.h = window.getBoundingClientRect().height || 100;
    }

    updateWindows();
}

function closeWindow(windowID) {
    windowState[windowID].open = false;
    updateWindows();
}
function openWindow(windowID) {
    windowState[windowID].open = true;

    randomPlaceWindow(windowID);
    
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