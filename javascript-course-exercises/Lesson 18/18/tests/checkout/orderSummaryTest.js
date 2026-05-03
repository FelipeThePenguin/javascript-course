import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';
import {loadProducts, loadProductsFetch} from '../../data/products.js';

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeAll(async () => {
    await loadProductsFetch();
  });
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    
    document.querySelector('.js-test-container').innerHTML = `
     <div class="js-checkout-header"></div>
     <div class="js-order-summary"></div>
     <div class="js-payment-summary"></div>
      <div class="confirm-order-container js-confirm-order-container">
      <div class="confirm-order">
        <div class="confirm-title">
          <span>Confirm Order?</span>
        </div>
        <div class="confirm-options js-confirm-status">
         <button class="button-primary js-confirm-order-button">Yes</button>
         <button class="button-secondary js-cancel-order-button">No</button>
        </div>
      </div>
    </div>
    `;
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
    productId: productId1,
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: productId2,
    quantity: 1,
    deliveryOptionId: '2'
  }]);
    });
    loadFromStorage();
    
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });
  
  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain('$10.90');

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain('$20.95');
  });
  
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    
     expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('updates the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(document.querySelector(`.js-payment-summary-money-shipping-price`).innerText).toContain('$14.98');
    expect(document.querySelector(`.js-payment-summary-money-total-price`).innerText).toContain('$63.50');
  });
});