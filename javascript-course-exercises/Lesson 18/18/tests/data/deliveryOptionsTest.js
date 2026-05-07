import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from "../../data/deliveryOptions.js";
import {isWeekend} from '../../scripts/utils/date.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs('2026-05-05T05:00:00.000Z');
const newDeliveryOption = deliveryOptions.slice();

describe('test suite: calculateDeliveryDate', () => {

 it('calculates the delivery date without passing the weekend', () => {

  const result = calculateDeliveryDate(deliveryOptions[2], today);
  const date = result.split(',');

  expect(isWeekend(today.add(deliveryOptions[2].deliveryDays, 'day'))).toEqual(false);
  expect(date[1]).toContain('May');
  expect(date[2]).toContain('6');
 });

 it('calculates the delivery date while skipping the weekend', () => {
  const result = calculateDeliveryDate(deliveryOptions[0], today);
  const date = result.split(',');

  expect(isWeekend(today.add(deliveryOptions[0].deliveryDays, 'day'))).toEqual(false);
  expect(date[1]).toContain('May');
  expect(date[2]).toContain('14');
 });

  it('calculates the delivery date with a new delivery option', () => {
  newDeliveryOption[3] = {
  id: '4',
  deliveryDays: 2,
  priceCents: 749
 };
  const result = calculateDeliveryDate(newDeliveryOption[3], today);
  const date = result.split(',');

  expect(isWeekend(today.add(newDeliveryOption[3].deliveryDays, 'day'))).toEqual(false);
  expect(date[1]).toContain('May');
  expect(date[2]).toContain('7');
 });

 it('calculates the delivery date with decimals', () => {
  newDeliveryOption[3] = {
  id: '4',
  deliveryDays: 0.5,
  priceCents: 1999
 };
  const result = calculateDeliveryDate(newDeliveryOption[3], today);
  const date = result.split(',');

  expect(isWeekend(today.add(newDeliveryOption[3].deliveryDays, 'day'))).toEqual(false);
  expect(date[1]).toContain('May');
  expect(date[2]).toContain('6');
 });

 it('does not calculate the delivery date with no delivery days', () => {
  newDeliveryOption[3] = {
  id: '4',
  priceCents: 749
 };

  const result = calculateDeliveryDate(newDeliveryOption[3], today);

  expect(result).toEqual(undefined);
 });

 it('does not calculate the delivery date with invalid dayjs object', () => {

  const result = calculateDeliveryDate(deliveryOptions[2], '5-5-2026');

  expect(result).toEqual(undefined);
 });

 it('does not calculate the delivery date with no delivery option object', () => {
  newDeliveryOption[3] = null;

  const result = calculateDeliveryDate(newDeliveryOption[3], today);

  expect(result).toEqual(undefined);
 });
});

describe('test suite: getDeliveryOption', () => {
 it('gets the delivery option', () => {
  const deliveryOption = getDeliveryOption('1');

  expect(deliveryOption.id).toEqual('1');
  expect(deliveryOption.deliveryDays).toEqual(7);
  expect(deliveryOption.priceCents).toEqual(0);
 });

  it('handles with no delivery option id', () => {
  const deliveryOption = getDeliveryOption();

  expect(deliveryOption).toEqual(undefined);
 });

  it('handles with a delivery option id that does not exist', () => {
  const deliveryOption = getDeliveryOption('4');

  expect(deliveryOption).toEqual(undefined);
 });
});