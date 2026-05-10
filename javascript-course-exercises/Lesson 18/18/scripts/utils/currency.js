import {formatCurrency} from './money.js';

export const currencies = {
 "USD": {
  value: 1,
  type: '$'
 },
 "JPY": {
  value: 160,
  type: '&yen;'
 },
 "EUR": {
  value: 0.86,
  type: '&euro;'
 }
};

export let currency;

export function convertCurrency(moneyCents) { 
 const money = formatCurrency(moneyCents * currencies[currency].value);

 return `${currencies[currency].type}${money}`;
}

export function loadFromStorage() {
  currency = localStorage.getItem('currency') || 'USD';
}

loadFromStorage();