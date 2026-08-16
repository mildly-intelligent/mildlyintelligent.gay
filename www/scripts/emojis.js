let elems = document.getElementsByTagName('i');

/**
 * @type {Promise<string[]>}
 */
let emojis_list = fetch("/misc/emojis.json")
	.then(response => response.text())
	.then(json => JSON.parse(json));
let emojis = emojis_list.then(l => {
	let res = {};
	for (const url of l) {
		let name = url.split('/')[4];
		res[name] = url;
	}
	return res;
})
for (const elem of elems) {
	let emoji_name = elem.getAttribute("emoji")
	if (emoji_name !== null) {
		const img = document.createElement('img');
		img.setAttribute("class", "emoji");
		emojis.then(json => {
			img.setAttribute("src", json[emoji_name]);
		});
		elem.appendChild(img);
	}
}