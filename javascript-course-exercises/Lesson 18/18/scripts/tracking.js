import {getOrdersProduct, getOrder, calculateOrderProgress} from '../data/orders.js';
import {products, getProduct, loadProductsFetch} from '../data/products.js';
import {addToCart, calculateCartQuantity} from '../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {renderAmazonHeader} from './shared/amazonHeader.js';


const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

function getRandomProducts() {
  const setOfNumbers = [];
  const setOfProducts = [];
  let num;

  for (let i = 0; setOfNumbers.length < 3; i++) {
   num = generateRandomNumber(setOfNumbers);
   setOfNumbers.push(num);
  }

 setOfNumbers.forEach((num) => {
  setOfProducts.push(products[num]);
 });

 return setOfProducts;
}

function generateRandomNumber(arr) {
  const num = Math.floor(Math.random() * (products.length));

  if (arr.includes(num)) {
   generateRandomNumber(arr)
  } else {
    return num;
  }
}
      
async function renderTrackingPage() {
 
 await loadProductsFetch();

 const randomProducts = getRandomProducts();
 const order = getOrder(orderId);
 
 const ordersProduct = getOrdersProduct(orderId, productId);
 const product = getProduct(ordersProduct.productId);

 const deliveryTime = dayjs(ordersProduct.estimatedDeliveryTime);
 const deliveryDate = deliveryTime.format('dddd, MMMM DD');

 const progress = calculateOrderProgress(orderId, productId);
 
 const orderTrackingContainer = document.querySelector('.js-order-tracking');
 const recommendedProductsContainer = document.querySelector('.js-recommended-products');
 
 orderTrackingContainer.innerHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
         ${progress >= 100 ? 'Product has already been arrived.' : `Arriving on ${deliveryDate}`}
        </div>

        <div class="product-info">
         ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${ordersProduct.quantity}
        </div>

        <img class="product-image" src="${
         product.image
        }">

        <img src="images/icons/checkmark.png" class="checkmark ${progress >= 100 ? 'product-order-complete' : ''}">

        <div class="progress-labels-container">
          <div class="progress-label ${
            0 <= progress && progress <= 49 ?
             'current-status'
            :
             ''
          }">
            Preparing
          </div>
          <div class="progress-label ${
            49 < progress && progress < 100 ?
             'current-status'
            :
             ''
          }">
            Shipped
          </div>
          <div class="progress-label ${
            100 <= progress ?
             'current-status'
            :
             ''
          }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="
           width: ${progress}%;
          "></div>
        </div>
      
 `;

 let recommededProductsHTML = ``;
 randomProducts.forEach((product) => {
  recommededProductsHTML += `
   <div class="recommended-product">
        <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
               Rating: <img src="${product.getStarsUrl()}" class="product-rating-image"> (${product.rating.count})
              </div>
              <div class="product-quantity js-product-quantity-${product.id}">
               Quantity: 1
              </div>
              <div class="product-quantity-container">
            <select class="js-quantity-selector js-quantity-selector-${product.id}" data-product-id="${product.id}">
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

            <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
            </div>
          </div>

            </div>

            <div class="product-actions">
               <button class="js-buy-product-button buy-product-button button-primary" data-product-id="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy product</span>
              </button>
            </div>
        </div>
  `;
 });

 recommendedProductsContainer.innerHTML = recommededProductsHTML;
 document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity() ? calculateCartQuantity() : '';

 document.querySelectorAll('.js-quantity-selector').forEach((selector) => {
  selector.addEventListener('input', () => {
    const {productId} = selector.dataset;

    document.querySelector(`.js-product-quantity-${productId}`).innerHTML = `
     Quantity: ${selector.value}
    `;
  });
 });

 document.querySelectorAll('.js-buy-product-button').forEach((button) => {
  let timeoutId;

  button.addEventListener('click', () => {
    const {productId} = button.dataset;
    const inputValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    
    addToCart(productId, inputValue);
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
    addedMessage.classList.add('show-added-message');

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      addedMessage.classList.remove('show-added-message');
    }, 2000);
  });
 });

}

renderAmazonHeader();
renderTrackingPage();