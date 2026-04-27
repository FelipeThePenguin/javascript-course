import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function isWeekend(date) {
 const dayOfWeek = date.format('dddd');
 
 return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export default isWeekend;