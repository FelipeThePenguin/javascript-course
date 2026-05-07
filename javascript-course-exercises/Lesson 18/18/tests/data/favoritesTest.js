import { favorites, isFavorite, addFavorite, removeFavorite, loadFromStorage } from "../../data/favorites.js";

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('test suite: isFavorite', () => {
 beforeEach(() => {
  spyOn(localStorage, 'setItem');
  spyOn(localStorage, 'getItem').and.callFake(() => {
   return JSON.stringify([productId1, productId2]);
  });
  loadFromStorage();
 });

 it('checks if the product is a favorite', () => {
   const result = isFavorite(productId1);
   expect(result).not.toEqual(undefined);
 });

 it('checks if the product is not a favorite', () => {
   const result = isFavorite('id-that-does-not-exist');
   expect(result).toEqual(undefined);
 });
});

describe('test suite: addFavorite', () => {
 beforeEach(() => {
  spyOn(localStorage, 'setItem');
  spyOn(localStorage, 'getItem').and.callFake(() => {
   return JSON.stringify([productId2]);
  });
  loadFromStorage();
 });

 it('add a new favorite product', () => {
   addFavorite(productId1);
   const result = isFavorite(productId1);

   expect(result).not.toEqual(undefined);
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([productId1, productId2]));
 });

 it('add a new favorite product to the left most of the array', () => {
   addFavorite(productId1);
   const result = isFavorite(productId1);

   expect(result).not.toEqual(undefined);
   expect(favorites[0]).toEqual(productId1);
   expect(favorites[1]).toEqual(productId2);
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([productId1, productId2]));
 });

 it('adds an existing favorite product', () => {
   addFavorite(productId2);
   const result = isFavorite(productId2);

   expect(result).not.toEqual(undefined);
   expect(favorites.length).toEqual(1);
   expect(favorites[0]).toEqual(productId2);
   expect(localStorage.setItem).toHaveBeenCalledTimes(0);
 });

});

describe('test suite: removeFavorite', () => {
 beforeEach(() => {
  spyOn(localStorage, 'setItem');
  spyOn(localStorage, 'getItem').and.callFake(() => {
   return JSON.stringify([productId1, productId2]);
  });
  loadFromStorage();
 });

 it('removes a favorite product', () => {
   removeFavorite(productId2);
   const result = isFavorite(productId2);

   expect(result).toEqual(undefined);
   expect(favorites.length).toEqual(1);
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([productId1]));
 });

 it('removes a favorite product that does not exist', () => {
   removeFavorite('id-that-does-not-exist');

   expect(isFavorite(productId1)).not.toEqual(undefined);
   expect(isFavorite(productId2)).not.toEqual(undefined);
   expect(favorites.length).toEqual(2);
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([productId1, productId2]));
 });

});