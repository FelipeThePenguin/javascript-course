import {calculateCartQuantity} from '../../data/cart.js';

export function renderCheckoutHeader() {
 document.querySelector('.js-checkout-header').innerHTML = `
  Checkout (<a class="return-to-home-link js-home-link" href="amazon.html">
  ${calculateCartQuantity()} items
  </a>)
 `;
}
