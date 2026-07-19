/**
 * @param {number} windowID
 */
function minimize(windowID) {
    console.log(windowID);
    let window = document.getElementById(windowID);
    console.log(window);
    window.setAttribute("style", "visibility: hidden;");
}