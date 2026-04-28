import {getProduct, loadProductsFetch, Product, Clothing, Appliance} from '../../data/products.js';

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'; // Normal Product
const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e'; // Clothing Product
const productId3 = '54e0eccd-8f36-462b-b68a-8182611d9add'; // Appliance Product

function compareProperties(comparedObject, comparingObject) {
    expect(comparedObject.id).toEqual(comparingObject.id);
    expect(comparedObject.image).toEqual(comparingObject.image);
    expect(comparedObject.name).toEqual(comparingObject.name);
    expect(comparedObject.rating.stars).toEqual(comparingObject.rating.stars);
    expect(comparedObject.rating.count).toEqual(comparingObject.rating.count);
    expect(comparedObject.priceCents).toEqual(comparingObject.priceCents);
}

describe('test suite: getProduct', () => {
  
  beforeAll( async () => {
    await loadProductsFetch();
  });
  
  it('gets the product using an id', () => {
    
    const product1 = getProduct(productId1);

    compareProperties(product1, {
      id: productId1,
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090
    });

  });
  
  it('returns undefined by using an id that does not exist', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    
    const product2 = getProduct('id-that-does-not-exist');
    
    expect(product2).toEqual(undefined);
  });
  
});

describe('test suite: Product', () => {
  beforeAll( async () => {
    await loadProductsFetch();
  });
  

  it('generates a Product class', () => {
    const product = new Product(getProduct(productId1));
    
     compareProperties(product, {
      id: productId1,
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090
    });
    expect(product.getStarsUrl()).toContain('images/ratings/rating-45.png');
    expect(product.getPrice()).toContain('$10.90');
  });

});

describe('test suite: Clothing', () => {
  beforeAll( async () => {
    await loadProductsFetch();
  });
  

  it('generates a Clothing class', () => {
    const product = new Clothing(getProduct(productId2));
    
     compareProperties(product, {
      id: productId2,
      image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
      name: 'Adults Plain Cotton T-Shirt - 2 Pack',
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799
    });
 
    expect(product.type).toEqual('clothing');
    expect(product.sizeChartLink).toEqual('images/clothing-size-chart.png');
    expect(product.getStarsUrl()).toContain('images/ratings/rating-45.png');
    expect(product.getPrice()).toContain('$7.99');
    expect(product.extraInfoHTML()).toContain('href="images/clothing-size-chart.png"');
  });

});

describe('test suite: Appliance', () => {
  beforeAll( async () => {
    await loadProductsFetch();
  });
  

  it('generates an Appliance class', () => {
    const product = new Appliance(getProduct(productId3));
    
     compareProperties(product, {
      id: productId3,
      image: 'images/products/black-2-slot-toaster.jpg',
      name: '2 Slot Toaster - Black',
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899
    });
    expect(product.type).toEqual('appliances');
    expect(product.instructionsLink).toEqual('images/appliance-instructions.png');
    expect(product.warrantyLink).toEqual('images/appliance-warranty.png');
    expect(product.getStarsUrl()).toContain('images/ratings/rating-50.png');
    expect(product.getPrice()).toContain('$18.99');
    expect(product.extraInfoHTML()).toContain('href="images/appliance-instructions.png"');
    expect(product.extraInfoHTML()).toContain('href="images/appliance-warranty.png"');
  });

});