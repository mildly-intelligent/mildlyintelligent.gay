let spans = document.getElementsByTagName('span');
let emojis = fetch("https://static.mildlyintelligent.gay/misc/emojis.json")
	.then(response => response.text())
	.then(json => JSON.parse(json));
console.log(emojis);
for (let i=0;i<spans.length;i++) {
	let span = spans[i];
	let emoji_name = span.getAttribute("emoji")
	if (emoji_name !== null) {
		const img = document.createElement('img');
		img.setAttribute("class", "emoji");
		emojis.then(json => {
			img.setAttribute("src", json[emoji_name]);
		});
		img.setAttribute("width", "17");
		img.setAttribute("height", "17");
		console.log(img);
		span.appendChild(img);
	}
}