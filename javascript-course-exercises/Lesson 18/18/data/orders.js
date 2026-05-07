import { getProduct } from "./products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export let orders;

loadFromStorage();

export function loadFromStorage() {
 orders = JSON.parse(localStorage.getItem('orders')) || [];
}

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

export function removeOrder(orderId) {
  orders.forEach((order, index) => {
   if (orderId === order.id) {
     orders.splice(index, 1);
     saveToStorage();
   }
  });
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;
  
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });
  
  return matchingOrder;
}

export function getOrdersProduct(orderId, productId) {
  const order = getOrder(orderId);
  let matchingProduct;

  if (!order) {
    return;
  }
  
  order.products.forEach((product) => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });
  
  return matchingProduct;
}

export function calculateOrderProgress(orderId, productId) {
   const order = getOrder(orderId); 
   const ordersProduct = getOrdersProduct(orderId, productId);
   
   if (!ordersProduct || !order) {
    return;
   }

   const deliveryTime = dayjs(ordersProduct.estimatedDeliveryTime);
   const deliveryDate = deliveryTime.format('dddd, MMMM DD');
   
   const currentTime = dayjs();
   const orderTime = dayjs(order.orderTime);
   const progress = (currentTime.diff(orderTime, 'minute') / deliveryTime.diff(orderTime, 'minute'))*100;

   return progress;
}

export function allIsDelivered(order) {
 let deliveredProducts = 0;

 if (!order?.id || !order?.products) {
  return;
 }

 order.products.forEach((product) => {
  if (calculateOrderProgress(order.id, product.productId) >= 100) {
   deliveredProducts++;
  }
 });

 return order.products.length === deliveredProducts;
}

export function addExpirationDate(order) {
 const expirationDate = dayjs().add(1, 'day').toISOString();
 order.expirationDate = order.expirationDate ?? expirationDate;
 saveToStorage();
 return order.expirationDate;
}