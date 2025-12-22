class Car {
  brand;
  model;
  speed = 0;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }
  
  displayInfo() {
    console.log(`${this.brand} - ${this.model}, Speed: ${this.speed} km/h`);
  }
  
  go() {
   if (this.speed === 200) {
     return;
   }
   this.speed += 5;
  }
  
  brake() {
   if (this.speed > 0)
   this.speed -= 5;
  }
  
}

function repeatFunctionTimes(fun, num) {
  
  for(let i = 0; i < num; i++) {
    fun();
  }
  
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

/*
console.log(car1);
console.log(car2);
*/

/*
car1.displayInfo();
car2.displayInfo();
*/

repeatFunctionTimes(() => {car1.go()}, 14);
repeatFunctionTimes(() => {car1.brake()}, 6);
repeatFunctionTimes(() => {car2.go()}, 7);

car1.displayInfo();
car2.displayInfo();