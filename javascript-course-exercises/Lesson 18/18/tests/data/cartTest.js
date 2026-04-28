import {addToCart, removeFromCart, cart, loadFromStorage, updateDeliveryOption} from '../../data/cart.js';
// import { products } from '../../data/products.js';

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

describe('test suite: addToCart', () => {
  beforeEach(() => {
   spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    
    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
     [{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }]
    ));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
  });
  
  it('adds a new product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    
    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
     [{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]
    ));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('test suite: removeFromCart', () => {

 beforeEach(() => {
  spyOn(localStorage, 'setItem');

  spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
  });

  loadFromStorage();
 });

 it('removes a product that is in the cart', () => {
  removeFromCart(productId1);

  expect(cart.length).toEqual(1);
  expect(cart[0].productId).toEqual(productId2);
  expect(cart[0].quantity).toEqual(1);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
    {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }
  ]));
 });

 it('removes a product that is not in the cart', () => {
  removeFromCart(productId3);

  expect(cart.length).toEqual(2);
  expect(cart[1].productId).toEqual(productId2);
  expect(cart[1].quantity).toEqual(1);
  expect(cart[0].productId).toEqual(productId1);
  expect(cart[0].quantity).toEqual(2);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );
 });

});

describe('test suite: updateDeliveryOption', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

     spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
     });

     loadFromStorage();
  });

  it('updates the delivery option of a product in the cart', () => {
   updateDeliveryOption(productId1, '3');

   expect(cart.length).toEqual(2);
   expect(cart[0].productId).toEqual(productId1);
   expect(cart[0].quantity).toEqual(2);
   expect(cart[0].deliveryOptionId).toEqual('3');
   expect(cart[1].productId).toEqual(productId2);
   expect(cart[1].quantity).toEqual(1);
   expect(cart[1].deliveryOptionId).toEqual('1');
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '3'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }]));
  });

  it('updates the delivery option of a product that is not in the cart', () => {
   updateDeliveryOption(productId3, '3');

   expect(cart.length).toEqual(2);
   expect(cart[0].productId).toEqual(productId1);
   expect(cart[0].quantity).toEqual(2);
   expect(cart[0].deliveryOptionId).toEqual('1');
   expect(cart[1].productId).toEqual(productId2);
   expect(cart[1].quantity).toEqual(1);
   expect(cart[1].deliveryOptionId).toEqual('1');
   expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

 it('updates the delivery option of a product in the cart with an undefined delivery option id', () => {
   updateDeliveryOption(productId1, '4');

   expect(cart.length).toEqual(2);
   expect(cart[0].productId).toEqual(productId1);
   expect(cart[0].quantity).toEqual(2);
   expect(cart[0].deliveryOptionId).toEqual('1');
   expect(cart[1].productId).toEqual(productId2);
   expect(cart[1].quantity).toEqual(1);
   expect(cart[1].deliveryOptionId).toEqual('1');
   expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  
});