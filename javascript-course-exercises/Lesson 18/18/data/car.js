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
  console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h. The trunk is ${this.isTrunkOpen ? 'open' : 'closed'}`);
 }

 go() {
  this.speed = this.speed + (this.speed === 200 || this.isTrunkOpen ? 0 : 5);
 }

 brake() {
  this.speed = this.speed - (this.speed === 0 ? 0 : 5);
 }

 openTrunk() {
  this.isTrunkOpen = this.speed ? false : true;
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
  this.speed = this.speed + (this.speed + this.acceleration >= 300 || this.isTrunkOpen ? 0 : this.acceleration);
 }

 openTrunk() {
  return;
 }

 closeTrunk() {
  return;
 }
}

function callFunMultipleTimes(fun, amount) {
 for (let i = 0; i < amount; i++) {
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
 acceleration: 13
});

callFunMultipleTimes(() => {
 car1.go()
}, 41);
car1.openTrunk();

raceCar1.openTrunk();
callFunMultipleTimes(() => {
 raceCar1.go()
}, 25);
raceCar1.displayInfo();

car2.brake();

car1.displayInfo();
car2.displayInfo();