import {getOrdersProduct, getOrder} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
      
async function renderTrackingPage() {
 
 await loadProductsFetch();
 const order = getOrder(orderId);
 
 const ordersProduct = getOrdersProduct(orderId, productId);
 const product = getProduct(ordersProduct.productId);
 
 const deliveryTime = dayjs(ordersProduct.estimatedDeliveryTime);
 const deliveryDate = deliveryTime.format('dddd, MMMM DD');
 
 const currentTime = dayjs();
 const orderTime = dayjs(order.orderTime);
 const progress = (currentTime.diff(orderTime, 'minute') / deliveryTime.diff(orderTime, 'minute'))*100;
 
 console.log(progress);
 
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
}

renderTrackingPage();