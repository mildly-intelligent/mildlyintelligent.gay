// Source: https://www.w3schools.com/howto/howto_js_draggable.asp
// Make the DIV element draggable:
dragElement(document.getElementById("window1"));

/**
 * @param {HTMLElement} elmnt 
 */
function dragElement(elmnt) {
  if (elmnt.classList.contains("maximized")) {
    elmnt.classList.remove("maximized")
  }

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
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
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}