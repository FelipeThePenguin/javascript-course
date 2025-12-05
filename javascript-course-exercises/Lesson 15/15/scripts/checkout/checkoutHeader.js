import {calculateCartQuantity} from '../../data/cart.js';

export function renderCheckoutHeader() {
  document.querySelector('.return-to-home-link').innerHTML = `${calculateCartQuantity()} items`
}