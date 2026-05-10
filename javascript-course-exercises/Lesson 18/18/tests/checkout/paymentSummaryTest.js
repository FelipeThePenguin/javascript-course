import {renderPaymentSummary, navigationObject, confirmOrder, getOrderBackend} from '../../scripts/checkout/paymentSummary.js';
import {loadFromStorage, cart, cartObject} from '../../data/cart.js';
import {loadProductsFetch} from '../../data/products.js';
import {orders} from '../../data/orders.js';

describe('test suite: renderPaymentSummary', () => {
let getItemSpy;
const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll( async () => {
    await loadProductsFetch();
  });
  
  beforeEach(() => {
    getItemSpy = spyOn(localStorage, 'getItem');
    document.querySelector('.js-test-container').innerHTML = `
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
    
     getItemSpy.and.callFake(() => {
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
        
        renderPaymentSummary();
        
        spyOn(localStorage, 'setItem');
        spyOn(cartObject, 'clearCart');
        spyOn(navigationObject, 'changeUrl');
    });
  
    afterEach(() => {
      document.querySelector('.js-test-container').innerHTML = '';
    });
    
    it('renders the payment summary', () => {
      expect(document.querySelector('.js-payment-summary-money-product-price').textContent).toContain('$42.75');
      expect(document.querySelector('.js-payment-summary-money-shipping-price').textContent).toContain('$4.99');
      expect(document.querySelector('.js-payment-summary-money-total-before-tax').textContent).toContain('$47.74');
      expect(document.querySelector('.js-payment-summary-money-tax').textContent).toContain('$4.77');
      expect(document.querySelector('.js-payment-summary-money-total-price').textContent).toContain('$52.51');
    });

    it('confirms and adds an order', async () => {
      const order = await getOrderBackend();
      jasmine.clock().install();
      
      confirmOrder(order);
   
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('orders', JSON.stringify(orders));
      expect(orders.includes(order)).toEqual(true);
      expect(cartObject.clearCart).toHaveBeenCalledTimes(1);
      
      jasmine.clock().tick(8000); // Waits for the timeout to finish
      expect(navigationObject.changeUrl).toHaveBeenCalledTimes(1);
      expect(navigationObject.changeUrl).toHaveBeenCalledWith('orders.html');
    });

    it('skips ordering an empty cart', async () => {
     getItemSpy.and.callFake(() => {return JSON.stringify([])});
     
     loadFromStorage();

     console.log(cart);
     const order = await getOrderBackend();
     confirmOrder(order);

     expect(localStorage.setItem).toHaveBeenCalledTimes(0);
     expect(navigationObject.changeUrl).toHaveBeenCalledTimes(0);
    });

}); 