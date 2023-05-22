(function () {
	async function getProduct(url) {
		try {
			let response = await fetch(url);
			let data = await response.json();
			return data;
		} catch (error) {
			console.log('Error:', error);
		}
	}

	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');

	getProduct(`https://dummyjson.com/products/${id}`).then(product => {
		createProductDetails(product);
	});

	function createProductDetails(product) {
		const container = document.querySelector('.container');

		const title = document.createElement('h1');
		title.setAttribute('class', 'product-title');
		title.innerHTML = product.title;
		container.appendChild(title);

		const imagesContainer = document.createElement('div');
		imagesContainer.setAttribute('class', 'images');
		container.appendChild(imagesContainer);

		product.images.forEach(image => {
			console.log(image);
			const imageDiv = document.createElement('div');
			imageDiv.setAttribute('class', 'image-div');

			const img = document.createElement('img');
			img.setAttribute('class', 'productImage');
			img.setAttribute('src', image);
			img.setAttribute('alt', product.title);
			imageDiv.appendChild(img);
			imagesContainer.appendChild(imageDiv);
		});

		const description = document.createElement('p');
		description.setAttribute('class', 'descriptionText');
		description.innerHTML = product.description;
		container.appendChild(description);

		const price = document.createElement('p');
		price.setAttribute('class', 'price');
		price.innerHTML = `Price: ${product.price}`;
		container.appendChild(price);
	}
})();
