import { calculateCartQuantity } from "../../data/cart.js";

export function renderAmazonHeader() {
 const amazonHeader = document.querySelector('.js-amazon-header');

 amazonHeader.innerHTML = `
  <div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo"
            src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar js-search-bar" type="text" placeholder="Search">

        <button class="search-button js-search-button">
          <img class="search-icon" src="images/icons/search-icon.png">
        </button>

        <button class="filter-button js-filter-button">
          <img class="filter-icon js-filter-icon" src="images/icons/filter-products-icon.png">

          <div class="filter-settings">
            <div class="filter-ratings-stars filter-option">
              <p>Stars rating:</p>
              <div class="stars-input-container">
               <input type="range" class="stars-input js-stars-input" min="0" max="10">
               <img src="images/ratings/rating-25.png" class="stars-display js-stars-display">
              </div>
            </div>
            <div class="filter-ratings-count filter-option">
              <p>Count ratings:</p>
              <div class="filter-input-container">
               <input class="filter-input-start js-ratings-count-min" placeholder="Min"> 
               <span>-</span>
               <input class="filter-input-end js-ratings-count-max" placeholder="Max">
              </div>
            </div>
            <div class="filter-price filter-option">
              <p>Price range:</p>
              <div class="filter-input-container">
               <div>
                <span class="filter-currency">&cent;</span> <input class="filter-input-start js-price-min" placeholder="Min"> 
               </div>
               <span>-</span>
               <div>
                <span class="filter-currency">&cent;</span> <input class="filter-input-end js-price-max" placeholder="Max">
               </div>
              </div>
            </div>
            <span class="link-primary js-clear-filter">Clear</span>
          </div>
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity js-cart-quantity">${calculateCartQuantity()}</div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
 `;

 const searchButton = document.querySelector('.js-search-button');

  const searchInput = document.querySelector('.js-search-bar');
  const starsInput = document.querySelector('.js-stars-input');
  const ratingInputMin = document.querySelector('.js-ratings-count-min');
  const ratingInputMax = document.querySelector('.js-ratings-count-max');
  const priceInputMin = document.querySelector('.js-price-min');
  const priceInputMax = document.querySelector('.js-price-max');

 function filterProducts() {
  const searchValue = searchInput.value;
   const starsValue= starsInput.value;
   const ratingMinValue = ratingInputMin.value;
   const ratingMaxValue = ratingInputMax.value;
   const priceMinValue = priceInputMin.value;
   const priceMaxValue = priceInputMax.value;

   const filterObject = {
    starsRange: Number(starsValue)/2, 
    ratingsRange: {
      min: Number(ratingMinValue) ? Number(ratingMinValue) : 0,
      max: Number(ratingMaxValue) ? Number(ratingMaxValue) : 10000
    },
    priceRange: {
      min: Number(priceMinValue) ? Number(priceMinValue) : 0,
      max: Number(priceMaxValue) ? Number(priceMaxValue) : 10000
    }
   };
   
   window.location.href = `amazon.html?search=${searchValue}&filter=${JSON.stringify(filterObject)}`;
 }
 
 searchButton.addEventListener('click', () => {
  filterProducts();
 });

 searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
   filterProducts();
  }
 });

 document.querySelector('.js-filter-icon').addEventListener('click', () => {
  if (amazonHeader.classList.contains('is-filtering-products')) {
   amazonHeader.classList.remove('is-filtering-products');
  } else {
   amazonHeader.classList.add('is-filtering-products');
  }
 });

 document.querySelector('.js-stars-input').addEventListener('input', () => {
  const inputValue = Number(document.querySelector('.js-stars-input').value);
  const starsUrl = inputValue === 0 ? 0 : String((inputValue/2)*10).padStart(2, '0');
 
  document.querySelector('.js-stars-display').src = `images/ratings/rating-${starsUrl}.png`;
 });

 document.querySelector('.js-clear-filter').addEventListener('click', () => {
  renderAmazonHeader();
 });
}