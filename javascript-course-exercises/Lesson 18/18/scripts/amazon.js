import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, loadProducts, loadProductsFetch} from '../data/products.js';
import {isFavorite, addFavorite, removeFavorite} from '../data/favorites.js';
import {formatCurrency} from './utils/money.js';
import {renderAmazonHeader} from './shared/amazonHeader.js';

function filterProducts() {

const url = new URL(window.location.href);
const search = url.searchParams.get('search');
const filter = JSON.parse(url.searchParams.get('filter'));
const favorites = JSON.parse(url.searchParams.get('favorites'));

function searchRequirements(product, keyword) {
 return (( (search.toLowerCase()).includes(keyword.toLowerCase()) || (product.name.toLowerCase()).includes(search.toLowerCase()) ) && 
             (
              product.rating.stars >= filter.starsRange &&
              product.rating.count >= filter.ratingsRange.min && product.rating.count <= filter.ratingsRange.max &&
              product.priceCents >= Number(filter.priceRange.min) * 100 && Number(product.priceCents) <= filter.priceRange.max * 100
        ));
}

renderAmazonHeader();

loadProductsFetch().then(() => {

  if (JSON.parse(favorites)) {
    const newArray = [];

    products.forEach((product) => {
      if (isFavorite(product.id)) {
        newArray.push(product);
      }
    });
    
    products.splice(0, products.length);
    
    newArray.forEach((product) => {
      products.push(product);
    });

  } else if (JSON.parse(favorites) === false) {
     const newArray = [];

    products.forEach((product) => {
      if (!isFavorite(product.id)) {
        newArray.push(product);
      }
    });
    
    products.splice(0, products.length);
    
    newArray.forEach((product) => {
      products.push(product);
    });
  }
  
  if (search || filter) {
    const searchInput = document.querySelector('.js-search-bar');
    searchInput.value = search;

    const newArray = [];
    
    let containsKeyword;
  
    products.forEach((product) => {
      product.keywords.forEach((keyword) => {
        if ( searchRequirements(product, keyword) && !newArray.includes(product)
           ) {
        newArray.push(product);
        }
      });
    });
    
    products.splice(0, products.length);
    
    newArray.forEach((product) => {
      products.push(product);
    });

  } 
  renderProductsGrid();
});

}

function renderProductsGrid() {

let productsHTML = '';

products.forEach((product) => {
   productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
            <button class="select-favorite js-select-favorite" data-product-id="${product.id}">
               <img src="images/icons/${isFavorite(product.id) ? '' : 'empty-'}star-icon.svg">
            </button>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          
          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
 
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity() === 0 ? ''
      : calculateCartQuantity();

}

 updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  let timeoutId;
  
  button.addEventListener('click', () => {
    
    const {productId} = button.dataset;
    
    const quantityInput = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantityValue = Number(quantityInput.value);
    
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('show-added-message');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
     addedMessage.classList.remove('show-added-message');
    }, 2000);
    
  addToCart(productId, quantityValue);
  updateCartQuantity();
  });
});

 document.querySelectorAll('.js-select-favorite').forEach((button) => {
  button.addEventListener('click', () => {
    const {productId} = button.dataset;

    if (isFavorite(productId)) {
     removeFavorite(productId);
    } else {
     addFavorite(productId);
    }

    renderProductsGrid();
  });
 });

}

filterProducts();
