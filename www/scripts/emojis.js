/**
 * @type {Promise<string[]>}
 */
var emojis = fetch("/misc/emojis.json")
	.then(response => response.text())
	.then(json => JSON.parse(json))
	.then(urls => {
		let res = {};
		for (const url of urls) {
			let name = url.split('/')[4];
			res[name] = url;
		}
		return res;
	});

function renderEmojis() {
	let elems = document.getElementsByTagName('i');
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
}

renderEmojis();