export let favorites;

export function loadFromStorage() {
 favorites = JSON.parse(localStorage.getItem('favorites')) || [];
}

loadFromStorage();

function saveToStorage() {
 localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function isFavorite(productId) {
 let matchingProduct;

 favorites.forEach((favorite) => {
  if (favorite === productId) {
   matchingProduct = favorite;
  }
 });

 return matchingProduct;
}

export function addFavorite(productId) {
 if (isFavorite(productId)) {
  return;
 }
 
 favorites.unshift(productId);

 saveToStorage();
}

export function removeFavorite(productId) {
 favorites.forEach((favorite, index) => {
  if (favorite === productId) {
   favorites.splice(index, 1);
  }
 });

 saveToStorage();
}