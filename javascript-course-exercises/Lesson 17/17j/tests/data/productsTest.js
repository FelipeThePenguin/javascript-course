import {Product, Clothing, Appliance} from '../../data/products.js';

function testCommonCasesOf(product, expected) {
  expect(product.id).toEqual(expected.id);
  expect(product.image).toEqual(expected.image);
  expect(product.name).toEqual(expected.name);
  expect(product.rating.stars).toEqual(expected.rating.stars);
  expect(product.rating.count).toEqual(expected.rating.count);
  expect(product.priceCents).toEqual(expected.priceCents);
  expect(product.getStarsUrl()).toEqual(expected.getStarsUrlValue);
  expect(product.getPrice()).toEqual(expected.getPriceValue);
  
  document.querySelector('.js-test-container').innerHTML = product.extraInfoHTML();
}

describe('test suite: Product', () => {
  
  it('creates a Product classed object', () => {
    
    const product = new Product({
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
    rating: {
      stars: 4.5,
      count: 363
    },
    priceCents: 3099,
    keywords: [
      "bedroom",
      "home"
    ]
  });
  
    testCommonCasesOf(product, {
      id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
      image: "images/products/blackout-curtains-black.jpg",
      name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
      rating: {
        stars: 4.5,
        count: 363
      },
      priceCents: 3099,
      getStarsUrlValue: 'images/ratings/rating-45.png',
      getPriceValue: '$30.99'
    });
  
  });
  
});

describe('test suite: Clothing', () => {
  
  it('creates a Clothing classed object', () => {
    
    const product = new Clothing({
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 1374,
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });
  
    testCommonCasesOf(product, {
  id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
  image: "images/products/women-stretch-popover-hoodie-black.jpg",
  name: "Women's Stretch Popover Hoodie",
  rating: {
    stars: 4.5,
    count: 2465
  },
  priceCents: 1374,
  type: "clothing",
  sizeChartLink: "images/clothing-size-chart.png",
  getStarsUrlValue: 'images/ratings/rating-45.png',
  getPriceValue: '$13.74'
});

    expect(product.sizeChartLink).toEqual("images/clothing-size-chart.png");
    
    const linkElement = document.querySelector('.js-size-chart-link');
    
    expect(linkElement.innerText).toContain("Size chart");
    expect(linkElement.getAttribute('href')).toEqual(product.sizeChartLink);
    
    document.querySelector('.js-test-container').innerHTML = '';
  });
  
});

describe('test suite: Appliance', () => {
  
  it('creates an Appliance classed object', () => {
    
    const product = new Appliance({
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
    rating: {
      stars: 4.5,
      count: 1211
    },
    priceCents: 2250,
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ],
    type: 'appliance',
    instructionsLink: 'images/appliance-instructions.png',
    warrantyLink: 'images/appliance-warranty.png'
  });
  
    testCommonCasesOf(product, {
  id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
  image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
  name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
  rating: {
    stars: 4.5,
    count: 1211
  },
  priceCents: 2250,
  keywords: [
    "coffeemakers",
    "kitchen",
    "appliances"
  ],
  type: 'appliance',
  instructionsLink: 'images/appliance-instructions.png',
  warrantyLink: 'images/appliance-warranty.png',
  getStarsUrlValue: 'images/ratings/rating-45.png',
  getPriceValue: '$22.50'
});

    expect(product.instructionsLink).toEqual("images/appliance-instructions.png");
    expect(product.warrantyLink).toEqual("images/appliance-warranty.png");
    
    const linkElement1 = document.querySelector('.js-instructions-link');
    
    const linkElement2 = document.querySelector('.js-warranty-link');
    
    expect(linkElement1.innerText).toContain("Instructions");
    expect(linkElement1.getAttribute('href')).toEqual(product.instructionsLink);
    
    expect(linkElement2.innerText).toContain("Warranty");
    expect(linkElement2.getAttribute('href')).toEqual(product.warrantyLink);
    
    document.querySelector('.js-test-container').innerHTML = '';
  });
  
});