import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { formatCurrency } from './utils/money.js';
import { orders } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js'; 

export async function loadPage() {
  await loadProductsFetch()
  
  let ordersHTML = ``;
  
  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime);
    
    ordersHTML += `        
    <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate.format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productDetailsHTML(order.products, order.id)}
          </div>
        </div>
        `;
  });

 function productDetailsHTML(products, orderId) {
   let productsHTML = ``;
   
   products.forEach((product) => {
     const productDate = dayjs(product.estimatedDeliveryTime);
    const matchingProduct = getProduct(product.productId);
     
    productsHTML += `            
    <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${productDate.format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=123&productId=456">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
   });
   
   return productsHTML;
 }

 document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

loadPage();