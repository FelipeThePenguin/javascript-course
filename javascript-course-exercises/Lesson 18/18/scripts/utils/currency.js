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

export function convertCurrency(moneyCents) {

 let currency = localStorage.getItem('currency') || 'USD';

 if (currency.length !== 3)  {
  currency = 'USD';
 }
 
 const money = formatCurrency(moneyCents * currencies[currency].value);

 return `${currencies[currency].type}${money}`;
}