const script = document.currentScript;

let time = script.getAttribute("time") || "null";
let uid = script.getAttribute("uid");
let ctx = script.getAttribute("ctx");
/** @type {string} */
let msg = script.innerText;
msg = msg.replaceAll('\n', '<pre>    </pre>');

let html = `<div>
	<i>TIMESTAMP</i>: ${time} <br>`;
if (uid !== null) html += `	<i>UID</i>: ${uid} <br>`;
if (ctx !== null) html += `	<i>CTX</i>: ${ctx} <br>`;
html += `
	<i>CONTENT</i>: <br>${msg} <br>
	<i>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</i> <br>
</div>`;

script.outerHTML = html;