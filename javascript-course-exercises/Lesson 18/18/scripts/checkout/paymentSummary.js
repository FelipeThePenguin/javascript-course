import {cart, calculateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {convertCurrency} from '../utils/currency.js';
import {addOrder} from '../../data/orders.js'

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    
    productPriceCents += product.priceCents * cartItem.quantity;
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    
    shippingPriceCents += deliveryOption.priceCents;
  });
  
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  
  const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money js-payment-summary-money-product-price">
            ${convertCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-summary-money-shipping-price">
            ${convertCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-payment-summary-money-total-before-tax">
            ${convertCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money js-payment-summary-money-tax">
            ${convertCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-payment-summary-money-total-price">
            ${convertCurrency(totalCents)}
            </div>
          </div>

          <div class="payment-summary-row payment-summary-title payment-options-container">
           Payment Options:
           <div class="payment-options">
            <button class="payment-option js-payment-option selected-payment">
             <img src="images/payment/visa.png"> <div class="payment-tooltip">Visa</div>
            </button>
            <button class="payment-option  js-payment-option">
             <img src="images/payment/mastercard.svg"> <div class="payment-tooltip">Mastercard</div>
            </button>
            <button class="payment-option  js-payment-option">
             <img src="images/payment/american-express.png"> <div class="payment-tooltip">American Express</div>
            </button>
            <button class="payment-option  js-payment-option">
             <img src="images/payment/paypal.png"> <div class="payment-tooltip">Paypal</div>
            </button>
            <button class="payment-option  js-payment-option">
             <img src="images/payment/delivery.svg"> <div class="payment-tooltip">Pay on Delivery</div>
            </button>
           </div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;
  
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  
  document.querySelector('.js-place-order')
  .addEventListener('click', () => {
    document.querySelector('.js-confirm-order-container').classList.add('is-ordering');

  });

  document.querySelectorAll('.js-payment-option').forEach((button) => {
   button.addEventListener('click', () => {
     document.querySelector('.selected-payment').classList.remove('selected-payment');
     button.classList.add('selected-payment');
   });
  });

  document.querySelector('.js-cancel-order-button')
  .addEventListener('click', () => {
    document.querySelector('.js-confirm-order-container').classList.remove('is-ordering');
  });

   document.querySelector('.js-confirm-order-button')
  .addEventListener('click', async () => {

     try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    });
    
    const order = await response.json();
    addOrder(order);
    localStorage.setItem('cart', JSON.stringify([]));
    
    } catch (error) {
      console.log('Unexpected Error. Try again later.');
    }

    const status = document.querySelector('.js-confirm-status');
    status.classList.add('confirm-status');

    status.innerHTML = `
     <img src="images/icons/loading-icon.gif" class="confirm-status-image">
     <p class="confirm-status-text">Processing payment and order...</p>
    `;

    new Promise((resolve) => {
      setTimeout(() => {
      status.innerHTML = `
      <img src="images/icons/confirm-checkmark.svg" class="confirm-status-image">
      <p class="confirm-status-text">Order confirmed.</p>
      `;
      resolve();
    }, 3000);
  }).then(() => {
    setTimeout(async () => {
    window.location.href = 'orders.html';   
    }, 5000);
    });
  });
}