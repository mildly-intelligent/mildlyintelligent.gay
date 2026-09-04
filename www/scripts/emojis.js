/**
 * @type {Promise<Object.<string,string>>}
 */
var emojis = fetch("/misc/emojis.json")
	.then(response => response.text())
	.then(json => JSON.parse(json))
	.then(urls => {
		let res = {};
		for (const url of urls) {
			res[url.split('/')[4]] = url;
		}

		return res;
	});

/**
 * Turns emojis into images
 */
function renderEmojis() {
	let body = document.getElementsByTagName('body')[0];

	emojis.then(emojis => {
		for (const [name, url] of Object.entries(emojis)) {
			body.innerHTML = body.innerHTML.replaceAll(`:${name}:`, `<img class="emoji" src="${url}">`);
		}
	});
}

renderEmojis();