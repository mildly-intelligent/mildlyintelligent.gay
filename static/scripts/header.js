function add_header(header) {
	include(header).then(elem => {
		const items = elem.getElementsByTagName('a');

		for (let i=items.length-1;i>=0;i--) {
			let item = items[i];
			console.log(item.href, item.id, item.innerText)
			if (document.URL.startsWith(item.href)) {
				item
					.classList
					.add("active");
				break;
			}
		}
	})
}