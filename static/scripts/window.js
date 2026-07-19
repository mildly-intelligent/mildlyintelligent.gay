/**
 * @param {number} windowID
 */
function minimize(windowID) {
    console.log(windowID);
    let window = document.getElementById(windowID);
    console.log(window);
    window.setAttribute("style", "visibility: hidden;");
}

/**
 * @param {number} windowID
 */
function maximize(windowID) {
    console.log(windowID);
    let window = document.getElementById(windowID);
    console.log(window);

    let button = document.getElementById(windowID + "maximize");


    if (window.classList.contains("maximized")) {
        window.classList.remove("maximized");
        button.innerText = "🗖";

        let originalX = window.getAttribute("originalX") || 0;
        let originalY = window.getAttribute("originalY") || 0;
        let originalWidth = window.getAttribute("originalW") || 0;
        let originalHeight = window.getAttribute("originalH") || 0;

        window.setAttribute("style", `top: ${originalY}px; left: ${originalX}px; width: ${originalWidth}px; height: ${originalHeight}px;`);
    } else {
        window.classList.add("maximized");
        button.innerText = "🗗";

        window.setAttribute("originalX", window.getBoundingClientRect().x || 0);
        window.setAttribute("originalY", window.getBoundingClientRect().y || 0);
        window.setAttribute("originalW", window.getBoundingClientRect().width || 0);
        window.setAttribute("originalH", window.getBoundingClientRect().height || 0);

        window.setAttribute("style", `top: 0px; left: 0px; width: 100%; height: 100%;`);
    }
}