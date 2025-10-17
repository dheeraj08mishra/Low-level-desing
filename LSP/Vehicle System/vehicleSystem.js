class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  startEngine() {
    console.log("Engine started");
  }
  stopEngine() {
    console.log("Engine stopped");
  }
  move() {
    console.log("Vehicle is moving");
  }
}

class Car extends Vehicle {
  constructor(make, model, year, numDoors) {
    super(make, model, year);
    this.numDoors = numDoors;
  }
  openTrunk() {
    console.log("Trunk opened");
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model, year, hasSidecar) {
    super(make, model, year);
    this.hasSidecar = hasSidecar;
  }
  popWheelie() {
    console.log("Popping a wheelie!");
  }
}
