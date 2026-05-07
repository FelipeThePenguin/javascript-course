const chars = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z',
  '0','1','2','3','4','5','6','7','8','9'
];

export function generateRandomId() {
 const indexStops = [8, 13, 18, 23];
 let result = '';

 for (let i = 0; i < 36; i++) {
  if (indexStops.includes(i)) {
   result += '-'
   continue;
  }

  result += chars[Math.floor(Math.random() * chars.length)];
 }

 return result
}