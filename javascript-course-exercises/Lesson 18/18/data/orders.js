export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function getOrder(orderId) {
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
  
  order.products.forEach((product) => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });
  
  return matchingProduct;
}