(function () {
	async function getProducts(url) {
		try {
			let response = await fetch(url);
			let data = await response.json();
			return data;
		} catch (error) {
			console.log('Error:', error);
		}
	}

	const urlParams = new URLSearchParams(window.location.search);
	const limit = urlParams.get('limit') ?? 12;
	const skip = urlParams.get('skip') ?? 0;

	getProducts(
		`https://dummyjson.com/products?limit=${limit}&skip=${skip}`
	).then(data => {
		createProductsContainer(data.products);
		createPagination(data.total, limit);
	});

	function createProductsContainer(products) {
		const container = document.querySelector('.productsContainer');

		products.forEach(product => {
			const card = createProductCard(product);
			container.appendChild(card);
		});
	}

	function createProductCard(product) {
		const card = document.createElement('article');
		card.setAttribute('class', 'productCard');

		const title = document.createElement('h2');
		title.setAttribute('class', 'productTitle');
		title.innerHTML = product.title;
		card.appendChild(title);

		const imageContainer = document.createElement('div');
		imageContainer.setAttribute('class', 'imageContainer');

		const imageLink = document.createElement('a');
		imageLink.setAttribute('class', 'productImageLink');
		imageLink.setAttribute('href', `/product-details.html?id=${product.id}`);

		const image = document.createElement('img');
		image.setAttribute('class', 'productImage');
		image.setAttribute('src', product.thumbnail);
		image.setAttribute('alt', product.title);

		imageLink.appendChild(image);
		imageContainer.appendChild(imageLink);
		card.appendChild(imageContainer);

		const description = document.createElement('p');
		description.setAttribute('class', 'descriptionText');
		description.innerHTML = product.description;
		card.appendChild(description);

		const price = document.createElement('p');
		price.setAttribute('class', 'price');
		price.innerHTML = `Price: ${product.price}`;
		card.appendChild(price);

		return card;
	}

	function createPagination(total, limit) {
		const pages = Math.ceil(total / limit);
		const paginationContainer = document.querySelector('.paginationContainer');
		for (let i = 1; i <= pages; i++) {
			var link = document.createElement('a');
			link.href = `/index.html?limit=${limit}&skip=${(i - 1) * limit}`;
			link.textContent = i;
			paginationContainer.appendChild(link);
		}
	}
})();
