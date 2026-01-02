import {getProduct, loadProductsFetch} from '../../data/products.js';

describe('test suite: getProduct', () => {
  
  beforeAll( async () => {
    await loadProductsFetch();
  });
  
  it('gets the product using an id', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    
    const product1 = getProduct(productId1);
    
    expect(product1.id).toEqual(productId1);
    expect(product1.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(product1.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product1.rating.stars).toEqual(4.5);
    expect(product1.rating.count).toEqual(87);
    expect(product1.priceCents).toEqual(1090);
  });
  
  it('returns undefined by using an id that does not exist', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  
  const product2 = getProduct('id-that-does-not-exist');
  
  expect(product2).toEqual(undefined);
});
  
});