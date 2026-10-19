/**
 * @type {Promise<Object.<string,string>>}
 */
var emojis = fetch("/misc/emojis.txt")
	.then(response => response.text())
	.then(text => text.split('\n'))
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

// renderEmojis();