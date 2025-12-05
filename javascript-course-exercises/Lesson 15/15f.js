export default function isSatSun(date) {
     const formattedDate = date.format('dddd');
     return formattedDate === 'Saturday' || formattedDate === 'Sunday';
   }