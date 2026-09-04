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
 * @param {string} windowID Window's ID
 * Positions the window in a random place on the screen
 */
function randomPlaceWindow(windowID) {
    let window = document.getElementById(windowID);
    let state = windowState[windowID];

    let desktop = document.getElementById("wallpaper-container").getBoundingClientRect();
    let placementRangeXMax = desktop.width - state.rect.w;
    let placementRangeYMax = desktop.height - state.rect.h;

    state.rect.x = Math.random() * placementRangeXMax;
    window.style.left = `${state.rect.x}px`;
    state.rect.y = Math.random() * placementRangeYMax;
    window.style.top = `${state.rect.y}px`;

    updateWindowPos(windowID);
}

/**
 * @param {string} windowID Window's ID
 * @param {State} state Starting state of the window
 * Initializes a window with a state
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

/**
 * @param {string} windowID Window's ID
 * Update the positions of windows
 */
function updateWindowPos(windowID) {
    let window = document.getElementById(windowID);
    let state = windowState[windowID];

    if (state.minimized || !state.open) {
        window.hidden = true;
    } else {
        window.hidden = false;
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

/**
 * Update and refreshes the position and properties of all windows
 */
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
            taskbarItem.setAttribute("onclick", `focusWindow('${windowID}')`);
            taskbar.appendChild(taskbarItem);
        }
    }
}


/**
 * @param {string} windowID Window's ID
 * Minimizes the window
 */
function minimize(windowID) {
    windowState[windowID].minimized = true;
    updateWindows();
}

/**
 * @param {string} windowID Window's ID
 * Brings a minimized window back
 */
function restore(windowID) {
    windowState[windowID].minimized = false;
    updateWindows();
}

/**
 * @param {string} windowID Window's ID
 * Maximizes the window
 */
function maximize(windowID) {
    let window = document.getElementById(windowID);
    let state = windowState[windowID];

    let button = document.getElementById(windowID + "maximize");

    if (state.maximized) {
        state.maximized = false;
        button.innerText = "🗖";

        window.style.left = `${state.rect.x}px`;
        window.style.top = `${state.rect.y}px`;
        window.style.width = `${state.rect.w}px`;
        window.style.height = `${state.rect.h}px`;
    } else {
        state.maximized = true;
        button.innerText = "🗗";

        state.rect.x = window.getBoundingClientRect().x || 0;
        state.rect.y = window.getBoundingClientRect().y || 0;
        state.rect.w = window.getBoundingClientRect().width || 100;
        state.rect.h = window.getBoundingClientRect().height || 100;
    }

    updateWindows();
}

/**
 * @param {string} windowID Window's ID
 * Closes the window
 */
function closeWindow(windowID) {
    windowState[windowID].open = false;
    updateWindows();
}
/**
 * @param {string} windowID Window's ID
 * Opens the window
 */
function openWindow(windowID) {
    windowState[windowID].open = true;

    randomPlaceWindow(windowID);
    
    focusWindow(windowID);
}

/**
 * @param {string} windowID Window's ID
 * Brings the window to the front
 */
function focusWindow(windowID) {
    let i = 0;
    for (const [ID, state] of Object.entries(windowState)) {
        if (ID == windowID) { continue; }
        state.z = i;
        i++;
    }
    windowState[windowID].z = i;

    if (windowState[windowID].minimized) {
        restore(windowID);
    } else {
        updateWindows();
    }
}