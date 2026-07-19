fetch("https://static.mildlyintelligent.gay/misc/88x31.json")
	.then(response => response.text())
	.then(text => {
		/** @type {Object} */
		let json = JSON.parse(text);
		const div = document.getElementById("88x31-list");
		for (url of Object.keys(json)) {
			if (url == "$schema") { continue; }

			const img = document.createElement('img');
			img.setAttribute("src", "https://static.mildlyintelligent.gay/images/88x31/" + url);
			img.setAttribute("class", "_88x31");

			let link_href = json[url];

			console.log(`Adding 88x31 ${url} with link ${link_href}`);

			if (link_href === null) {
				div.appendChild(img);
			} else {
				const link = document.createElement('a');
				link.setAttribute("href", link_href);
				link.appendChild(img);
				div.appendChild(link);
			}
		}
	});