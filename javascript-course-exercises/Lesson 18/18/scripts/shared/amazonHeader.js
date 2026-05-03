import { calculateCartQuantity } from "../../data/cart.js";
import { currencies } from '../utils/currency.js';

export function renderAmazonHeader() {
 const amazonHeader = document.querySelector('.js-amazon-header');
 const selectedCurrency = localStorage.getItem('currency') || 'USD';
 const currencyDetails = {
  'USD': 'american',
  'EUR': 'european',
  'JPY': 'japanese'
 };
const currencyRate = currencies[selectedCurrency].value;
let favorites = false;

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

          <div class="filter-settings js-filter-settings">
            <div class="filter-option">
             <p>Favorites:</p>
             <img src="images/icons/empty-star-icon.svg" class="favorite-icon js-favorite-icon">
            </div>

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
                <span class="filter-currency">${currencies[selectedCurrency].type}</span> <input class="filter-input-start js-price-min" placeholder="Min"> 
               </div>
               <span>-</span>
               <div>
                <span class="filter-currency">${currencies[selectedCurrency].type}</span> <input class="filter-input-end js-price-max" placeholder="Max">
               </div>
              </div>
            </div>
            <span class="link-primary js-clear-filter">Clear</span>
            <div class="change-currency">
             <p>Change currency:</p>
             <div class="change-currency-option">
              <div class="current-currency-option js-current-currency-option">
               <img src="images/flags/${currencyDetails[selectedCurrency]}-flag.webp" class="currency-option-image"> 
               <div class="currency-option-type">${selectedCurrency}<img src="images/icons/right-arrow.png" class="currency-arrow"></div>
              </div>

              <div class="currency-options">
               <div class="currency-option js-current-option" data-currency-option="USD">
                <img src="images/flags/american-flag.webp" class="currency-option-image"> <span class="currency-option-type">USD</span>
               </div>
               <div class="currency-option js-current-option" data-currency-option="EUR">
                <img src="images/flags/european-flag.webp" class="currency-option-image"> <span class="currency-option-type">EUR</span>
               </div>
               <div class="currency-option js-current-option" data-currency-option="JPY">
                <img src="images/flags/japanese-flag.webp" class="currency-option-image"> <span class="currency-option-type">JPY</span>
               </div>
              </div>

             </div> <!-- Change Currency Options -->
            </div> <!-- Change Currency -->
          </div> <!-- Filter settings -->
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity js-cart-quantity">${calculateCartQuantity() === 0 ? '' : calculateCartQuantity()}</div>
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
      max: Number(ratingMaxValue) ? Number(ratingMaxValue) : 999999
    },
    priceRange: {
      min: Number(priceMinValue) ? (Number(priceMinValue)/currencyRate).toFixed(2) : 0,
      max: Number(priceMaxValue) ? (Number(priceMaxValue)/currencyRate).toFixed(2) : 999999
    }
   };
   
   window.location.href = `amazon.html?search=${searchValue}&filter=${JSON.stringify(filterObject)}&favorites=${favorites}`;
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

 document.querySelector('.js-current-currency-option').addEventListener('click', () => {
  const filterSettings = document.querySelector('.js-filter-settings');
  
  if (filterSettings.classList.contains('is-editing-currency')) {
     filterSettings.classList.remove('is-editing-currency');
  } else {
     filterSettings.classList.add('is-editing-currency');
  }
 });

 document.querySelectorAll('.js-current-option').forEach((option) => {
  option.addEventListener('click', () => {
   const {currencyOption} = option.dataset;

   localStorage.setItem('currency', currencyOption);

   window.location.href = window.location.href;
  });
 });

 const favoritesButton = document.querySelector('.js-favorite-icon');

 favoritesButton.addEventListener('click', () => {
  if (favoritesButton.classList.contains('is-favorite')) {
    favoritesButton.classList.remove('is-favorite');
    favoritesButton.src = 'images/icons/empty-star-icon.svg';
    favorites = false;
  } else {
   favoritesButton.classList.add('is-favorite');
   favoritesButton.src = 'images/icons/star-icon.svg';
   favorites = true;
  }

 });
}