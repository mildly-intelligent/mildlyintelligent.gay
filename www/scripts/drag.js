// Source: https://www.w3schools.com/howto/howto_js_draggable.asp
// Make the DIV element draggable:

function clamp(x, lo, hi) {
  return Math.max(Math.min(x, hi), lo);
}

/**
 * @param {HTMLElement} elmnt 
 */
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.getElementById(elmnt.id + "icon").onmousedown = dragMouseDown;
  document.getElementById(elmnt.id + "title").onmousedown = dragMouseDown;
  document.getElementById(elmnt.id + "spacer").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    let state = windowState[elmnt.id];
    if (state.maximized) {
      state.maximized = false;
    }

    document.getElementById(elmnt.id + "header").style.cursor = "grabbing";
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
    let state = windowState[elmnt.id];
    let xBorder = desktop.width - state.rect.w;
    let yBorder = desktop.height - state.rect.h;
    console.log(xBorder, yBorder)

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (clamp(elmnt.offsetTop - pos2, 0, yBorder)) + "px";
    elmnt.style.left = (clamp(elmnt.offsetLeft - pos1, 0, xBorder)) + "px";
  }

  function closeDragElement() {
    document.getElementById(elmnt.id + "header").style.cursor = "grab";
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}