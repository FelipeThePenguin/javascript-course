class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }
  
  displayInfo() {
    console.log(`${this.#brand} - ${this.#model}, Speed: ${this.speed} km/h. Trunk is ${this.isTrunkOpen ? 'Open' : 'Closed'}`);
  }
  
  go() {
   if (this.speed <= 200 && !this.isTrunkOpen) {
     this.speed += 5;
     return;
   }
   if (!this.isTrunkOpen) {
   this.speed = 200;
   }
  }
  
  brake() {
   if (this.speed > 0) {
     this.speed -= 5;
   }
  }

  openTrunk() {
   if (this.speed === 0) {
    this.isTrunkOpen = true;
   }
  }

  closeTrunk() {
   this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    
    this.acceleration = carDetails.acceleration;
  }
  
  go() {
   if (this.speed <= 300) {
     this.speed += this.acceleration;
     return;
   }
   this.speed = 300;
  }
  
  openTrunk() {
   return;
  }

  closeTrunk() {
   return;
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

const raceCar1 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
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
car1.openTrunk();
// This should not open the trunk of car1

car2.speed = 0;
car2.openTrunk();
car2.go();
// car2 should not go

car2.closeTrunk();
repeatFunctionTimes(() => {car2.go()}, 21);
// car 2 should go

car1.displayInfo();
car2.displayInfo();

repeatFunctionTimes(() => {raceCar1.go()}, 15);
raceCar1.openTrunk();
raceCar1.displayInfo();

// car2.#model = 'Model 67';
// This should result to an error