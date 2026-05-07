import {addToCart, removeFromCart, cart, 
        loadFromStorage, updateDeliveryOption, 
        calculateCartQuantity, updateQuantity, loadCart, loadCartFetch} from '../../data/cart.js';
// import { products } from '../../data/products.js';

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

function isCartTheSame() {
      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].quantity).toEqual(2);
      expect(cart[0].deliveryOptionId).toEqual('1');
      expect(cart[1].productId).toEqual(productId2);
      expect(cart[1].quantity).toEqual(1);
      expect(cart[1].deliveryOptionId).toEqual('1');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      expect(calculateCartQuantity()).toEqual(3);
}

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
    expect(calculateCartQuantity()).toEqual(2);
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
    expect(calculateCartQuantity()).toEqual(1);
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
  expect(calculateCartQuantity()).toEqual(1);
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
    expect(calculateCartQuantity()).toEqual(3);
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
   isCartTheSame();
  });

 it('updates the delivery option of a product in the cart with an undefined delivery option id', () => {
   updateDeliveryOption(productId1, '4');
   isCartTheSame();
  });

  
});

describe('test suite: calculateCartQuantity', () => {
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

 it('calculates the cart quantity', () => {
  const result = calculateCartQuantity();

  expect(result).toEqual(3);
 });
});

describe('test suite: updateQuantity', () => {

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

  it('updates the quantity of a product in the cart', () => {
   updateQuantity(productId1, 3);

   expect(cart.length).toEqual(2);
   expect(cart[0].productId).toEqual(productId1);
   expect(cart[0].quantity).toEqual(3);
   expect(cart[0].deliveryOptionId).toEqual('1');
   expect(cart[1].productId).toEqual(productId2);
   expect(cart[1].quantity).toEqual(1);
   expect(cart[1].deliveryOptionId).toEqual('1');
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: productId1,
        quantity: 3,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }]));
   expect(calculateCartQuantity()).toEqual(4);
  });

  it('updates the quantity of a product that is not in the cart (skips)', () => {
   updateQuantity(productId3, 3);

   isCartTheSame();
  });

 it('does not update the quantity of a product in the cart with a negative value', () => {
   updateQuantity(productId1, -1);
   isCartTheSame();
  });

  it('does update the quantity of a product in the cart with zero', () => {
   updateQuantity(productId1, 0);
   isCartTheSame();
  });

  it('does not update the quantity of a product in the cart with decimals', () => {
   updateQuantity(productId1, 3.14);
   isCartTheSame();
  });

  it('does not update the quantity of a product in the cart with no new quantity', () => {
   updateQuantity(productId1, undefined);
   isCartTheSame();
  });

  
});

describe('test suite: loadCart', () => {
  it('loads the cart from the backend using callbacks', (done) => {
    loadCart((result) => {
     expect(result).toContain('load cart');
     done();
    });
  });
});

describe('test suite: loadCartFetch', () => {
  it('loads the cart from the backend using async await', async () => {
   const result = await loadCartFetch();
   expect(result).toContain('load cart');
  });
});