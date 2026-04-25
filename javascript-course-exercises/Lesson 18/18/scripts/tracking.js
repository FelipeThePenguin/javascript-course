import {getOrdersProduct} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
      
async function renderTrackingPage() {
 
 await loadProductsFetch();
 
 const ordersProduct = getOrdersProduct(orderId, productId);
 const product = getProduct(ordersProduct.productId);
 
 const productDeliveryTime = dayjs(ordersProduct.estimatedDeliveryTime);
 const deliveryDate = productDeliveryTime.format('dddd, MMMM DD');
 
 console.log(deliveryDate);
 
 const orderTrackingContainer = document.querySelector('.js-order-tracking');
 
 orderTrackingContainer.innerHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
         Arriving on ${deliveryDate}
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

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      
 `;
}

renderTrackingPage();