let elems = document.getElementsByTagName('i');

let emojis = fetch("/misc/emojis.json")
	.then(response => response.text())
	.then(json => JSON.parse(json));
console.log(emojis);
for (let i = 0; i < elems.length; i++) {
	let elem = elems[i];
	let emoji_name = elem.getAttribute("emoji")
	if (emoji_name !== null) {
		const img = document.createElement('img');
		img.setAttribute("class", "emoji");
		emojis.then(json => {
			img.setAttribute("src", json[emoji_name]);
		});
		console.log(img);
		elem.appendChild(img);
	}
}