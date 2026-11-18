// Source: https://www.w3schools.com/howto/howto_js_draggable.asp
// Make the DIV element draggable

/**
 * @param {number} x number to clamp
 * @param {number} lo low end of the clamp
 * @param {number} hi high end of the clamp
 * @returns {number} clamped number
 * Forces a number between a range.
*/
function clamp(x, lo, hi) {
  return Math.max(Math.min(x, hi), lo);
}

/**
 * @param {HTMLElement} elem the element to enable drag for 
 * Enables drag for an element
 */
function dragElement(elem) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.getElementById(elem.id + "icon").onmousedown = dragMouseDown;
  document.getElementById(elem.id + "title").onmousedown = dragMouseDown;
  document.getElementById(elem.id + "spacer").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    let state = windowState[elem.id];
    if (state.maximized) {
      state.maximized = false;
    }

    document.getElementById(elem.id + "header").style.cursor = "grabbing";
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    let desktop = document.getElementById("wallpaper-container").getBoundingClientRect();
    let state = windowState[elem.id];
    let xBorder = desktop.width - state.rect.w;
    let yBorder = desktop.height - state.rect.h;

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elem.style.top = (clamp(elem.offsetTop - pos2, 0, yBorder)) + "px";
    elem.style.left = (clamp(elem.offsetLeft - pos1, 0, xBorder)) + "px";
  }

  function closeDragElement() {
    document.getElementById(elem.id + "header").style.cursor = "grab";
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}