import {orders, addOrder, removeOrder, 
 getOrdersProduct, getOrder, calculateOrderProgress, 
 allIsDelivered, addExpirationDate, loadFromStorage} from '../../data/orders.js';
import { generateRandomId } from '../../scripts/utils/id.js';

const order1 = {
      "id": "0e3713e6-209f-4bef-a3e2-ca267ad830ea",
      "orderTime": "2024-02-27T20:57:02.235Z",
      "totalCostCents": 5800,
      "products": [
        {
          "productId": 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          "quantity": 2,
          "estimatedDeliveryTime": "2024-03-01T20:57:02.235Z"
        },
        {
          "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          "quantity": 1,
          "estimatedDeliveryTime": "2024-03-01T20:57:02.235Z"
        }
      ]
    };

const order2 = {
      "id": "r552704m-817o-q7xq-j3mt-ofkpdbuzc3h3",
      "orderTime": "2024-03-01T20:57:02.235Z",
      "totalCostCents": 5825,
      "products": [
        {
          "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          "quantity": 3,
          "estimatedDeliveryTime":  "2024-03-08T20:57:02.235Z"
        },
        {
          "productId": "54e0eccd-8f36-462b-b68a-8182611d9add",
          "quantity": 1,
          "estimatedDeliveryTime":  "2024-03-02T20:57:02.235Z"
        }
      ]
    };

function compareProperties(comparedObject, comparingObject) {
    expect(comparedObject.id).toEqual(comparingObject.id);
    expect(comparedObject.orderTime).toEqual(comparingObject.orderTime);
    expect(comparedObject.totalCostCents).toEqual(comparingObject.totalCostCents);
    expect(comparedObject.totalCostCents).toEqual(comparingObject.totalCostCents);
    expect(comparedObject.products.length).toEqual(comparingObject.products.length);
}

function compareProductProperties(comparedProduct, comparingProduct) {
    expect(comparedProduct.productId).toEqual(comparingProduct.productId);
    expect(comparedProduct.quantity).toEqual(comparingProduct.quantity);
    expect(comparedProduct.estimatedDeliveryTime).toEqual(comparingProduct.estimatedDeliveryTime);
}

function compareProducts(orderArray) {
 orders.forEach((order, orderIndex) => {
  order.products.forEach((product, productIndex) => {
   compareProductProperties(product, orderArray[orderIndex].products[productIndex]);
  });
 });
}

function compareOrders(orderArray) {
 orders.forEach((order, index) => {
  compareProperties(order, orderArray[index]);
 });
}

 describe('test suite: addOrder', () => {
  beforeEach(() => {
   spyOn(localStorage, 'setItem');
  });

  it('adds an order', () => {
   spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([]);
   });
   const orderObject = order1;
   const orderArray = [order1];
   loadFromStorage();
   addOrder(orderObject)
  
   compareOrders(orderArray);
   compareProducts(orderArray);
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('orders', JSON.stringify(orderArray));
  });

   it('adds another order to the leftmost of the orders array', () => {
   spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([order1]);
   });
   const orderObject = order2;
   const orderArray = [order2, order1];
   loadFromStorage();
   addOrder(orderObject);

   compareOrders(orderArray);
   compareProducts(orderArray);
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('orders', JSON.stringify(orderArray));
  });

 });

 describe('test suite: removeOrder', () => {
  beforeEach(() => {
   spyOn(localStorage, 'setItem');
   spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([order1, order2]);
   });

   loadFromStorage();
  });

  it('removes an order that is in the cart', () => {
   const orderId = order1.id;
   const orderArray = [order2];
   removeOrder(orderId)
  
   compareOrders(orderArray);
   compareProducts(orderArray);
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('orders', JSON.stringify(orderArray));
  });

   it('removes an order that is not in the cart', () => {
   const orderId = 'id-that-does-not-exist';
   const orderArray = [order1, order2];
   removeOrder(orderId);

   compareOrders(orderArray);
   compareProducts(orderArray);
   expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

 });

 describe('test suite: getOrder', () => {
  beforeEach(() => {
   spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([order1, order2]);
   });

   loadFromStorage();
  });

  it('finds an order', () => {
   const orderId = order1.id;
   const matchingOrder = getOrder(orderId);
  
   compareProperties(matchingOrder, order1);
   compareProductProperties(matchingOrder, order1);
  });

   it('does not find an order that does not exist', () => {
   const orderId = 'id-that-does-not-exist';
   const matchingOrder = getOrder(orderId);

   expect(matchingOrder).toEqual(undefined);
  });

 });

 describe('test suite: getOrdersProduct', () => {
  beforeEach(() => {
   spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([order1, order2]);
   });

   loadFromStorage();
  });

  it('finds a product in the orders', () => {
   const orderId = order1.id;
   const productId = order1.products[0].productId;
   const matchingProduct = getOrdersProduct(orderId, productId);
  
   compareProductProperties(matchingProduct, order1.products[0]);
  });

   it('does not find a product inside order with an order id that does not exist', () => {
   const orderId = 'id-that-does-not-exist';
   const productId = order1.products[0].productId;
   const matchingProduct = getOrdersProduct(orderId, productId);

   expect(matchingProduct).toEqual(undefined);
  });

  it('does not find a product inside order with a product id that does not exist', () => {
   const orderId = order1.id;
   const productId = 'id-that-does-not-exist';
   const matchingProduct = getOrdersProduct(orderId, productId);

   expect(matchingProduct).toEqual(undefined);
  });

 });

 describe('test suite: allIsDelivered', () => {
  beforeEach(() => {
   spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([order1, order2]);
   });

   loadFromStorage();
  });

  it('check if all of the products have arrived', () => {
   const allHasArrived = allIsDelivered(order1); 
   expect(allHasArrived).toEqual(true);
  });

  it('does not check if all of the products have arrived with no id and products in order', () => {
   const allHasArrived = allIsDelivered({}); 
   expect(allHasArrived).toEqual(undefined);
  });

 });

 describe('test suite: calculateOrderProgress', () => {
  beforeEach(() => {
   spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([order1, order2]);
   });
   loadFromStorage();
  });

  it('calculate the delivery progress of a product', () => {
   const orderId = order1.id;
   const productId = order1.products[0].productId;
   const progress = calculateOrderProgress(orderId, productId);
  
   expect(progress).not.toEqual(undefined);
  });

   it('does not calculate the product progress with an undefined order id', () => {
   const orderId = 'id-that-does-not-exist';
   const productId = order1.products[0].productId;
   const progress = calculateOrderProgress(orderId, productId);

   expect(progress).toEqual(undefined);
  });

  it('does not calculate the product progress with an undefined product id', () => {
   const orderId = order1.id;
   const productId = 'id-that-does-not-exist';
   const progress = calculateOrderProgress(orderId, productId);

   expect(progress).toEqual(undefined);
  });

 });

  describe('test suite: addExpirationDate', () => {
  beforeEach(() => {
   spyOn(localStorage, 'setItem');
   spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([order1, order2]);
   });
   loadFromStorage();
  });

  it('adds an expiration date to the order', () => {
   const expiryDate = addExpirationDate(orders[0]);
  
   expect(orders[0].expirationDate).not.toEqual(undefined);
   expect(expiryDate).not.toEqual(undefined);
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('orders',  JSON.stringify(orders));
  });

  it('adds an existing expiration date to the order', () => {
   const expiryDate = addExpirationDate(orders[0]);
   addExpirationDate(orders[0])
  
   expect(orders[0].expirationDate).not.toEqual(undefined);
   expect(expiryDate).not.toEqual(undefined);
   expect(localStorage.setItem).toHaveBeenCalledTimes(2);
   expect(localStorage.setItem).toHaveBeenCalledWith('orders',  JSON.stringify(orders));
  });

 });
