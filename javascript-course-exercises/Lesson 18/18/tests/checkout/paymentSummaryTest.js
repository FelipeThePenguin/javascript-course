import {renderPaymentSummary} from '../../scripts/checkout/paymentSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';
import {loadProductsFetch} from '../../data/products.js';

describe('test suite: renderPaymentSummary', () => {
  
const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll( async () => {
    await loadProductsFetch();
  });
  
  beforeEach(() => {
    
    document.querySelector('.js-test-container').innerHTML = `
     <div class="js-payment-summary"></div>
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
        
        renderPaymentSummary();
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

}); 