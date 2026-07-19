/** @param {string} url  */
function include(url) {
	let divID = "include-file-" + url.split('/')
		.at(-1)
		.split('.')
		.at(0);
	const elem = document.getElementById(divID);
	// console.log(divID);
	return fetch(url)
		.then(response => response.text())
		.then(html => {
			elem.innerHTML = html;
			return elem;
		});
}