class ProductList {
    constructor() {
        this.container = document.querySelector('.products-content');
        this.productsService = new ProductsService();
        this.renderProducts();
    }
    async renderProducts() {
        let productListDomString = '';
        const products = await this.productsService.getProducts();
        products.forEach(product => {
            productListDomString += this.createProductDomString(product);
        });
        this.container.innerHTML = productListDomString;
        this.addEventListeners();
    }
    createProductDomString(product) {
        return `<div class="product-card">
                    <div class="products-photo">
                        <img src="assets/img/${product.image}" alt="${product.title}" class="product-img">
                    </div>
                    <h5 class="product-title">${product.title}</h5>
                    <p class="product-price">$${product.price}</p>
                    <a class="products-button btn-buy button" data-id=${product.id}>Buy</a>
        </div>`;
    }
    addEventListeners() {
        document.querySelectorAll('.btn-buy').forEach(btn => {
            btn.addEventListener('click', this.addProductToCart.bind(this));
        });
    }
    async showProductInfo(event) {
        const id = event.target.dataset.id;
        const product = await this.productsService.getProductById(id);
        const modal = document.querySelector('#product-info-modal');
        modal.querySelector('.modal-title').innerHTML = product.title;
        modal.querySelector('.product-img').src = `assets/img/${product.image}`;
        modal.querySelector('.product-price').innerHTML = product.price;
        modal.querySelector('.btn-buy').dataset.id = product.id;
    }
    addProductToCart(event) {
        const id = event.target.dataset.id;
        const cart = new Cart();
        cart.addProduct(id);
    }
}
new ProductList();