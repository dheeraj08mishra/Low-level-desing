class User {
  #id;
  #name;
  #phoneNumber;
  constructor(id, name, phoneNumber) {
    this.#id = id;
    this.#name = name;
    this.#phoneNumber = phoneNumber;
  }
  getDetails() {
    return {
      id: this.#id,
      name: this.#name,
      phoneNumber: this.#phoneNumber,
    };
  }
}

class Rider extends User {
  constructor(id, name, phoneNumber) {
    super(id, name, phoneNumber);
  }
  requestRide(pickup, drop) {
    return RideService.matchRiderwithDriver(this, pickup, drop);
  }
}

class Driver extends User {
  #earnings;
  #available;
  constructor(id, name, phoneNumber, vehicleDetails) {
    super(id, name, phoneNumber);
    this.vehicleDetails = vehicleDetails;
    this.#earnings = 0;
  }
  acceptRides(rideDetails) {
    if (!this.#available) {
      console.log(`${this.getDetails().name} is currently unavailable.`);
      return;
    }
    this.#available = false;
    this.currentRide = rideDetails;
    console.log(`Ride accepted by ${this.getDetails().name}`);
  }
  markRideComplete() {
    if (this.currentRide) {
      this.#earnings += this.currentRide.fare;
      console.log(
        `Ride completed by ${this.getDetails().name}. Fare: $${
          this.currentRide.fare
        }`
      );
      this.currentRide = null;
      this.#available = true;
    } else {
      console.log("No ongoing ride to complete.");
    }
  }
  getEarnings() {
    return this.#earnings;
  }
  isAvailable() {
    return this.#available;
  }
  setAvailable(status) {
    this.#available = status;
  }
}

class RideService {
  static drivers = [];
  static registerDriver(driver) {
    if (driver instanceof Driver) {
      this.drivers.push(driver);
    } else {
      throw new Error("Only drivers can be registered");
    }
  }
  static matchRiderwithDriver(rider, pickup, drop) {
    let filterAvalailableDrivers = this.drivers.filter((driver) =>
      driver.isAvailable()
    );
    if (filterAvalailableDrivers.length === 0) {
      console.log("No drivers available at the moment.");
      return null;
    }
    const driver =
      filterAvalailableDrivers[
        Math.floor(Math.random() * filterAvalailableDrivers.length)
      ];
    const fare = Ride.calculateFare(pickup, drop);
    const ride = new Ride(rider, driver, pickup, drop, fare);
    driver.acceptRides(ride);
    return ride;
  }
}

class Ride {
  constructor(rider, driver, pickup, drop, fare) {
    this.rideId = Ride.generateRideId();
    this.rider = rider;
    this.driver = driver;
    this.pickup = pickup;
    this.drop = drop;
    this.fare = fare;
  }
  getRideDetails() {
    return {
      rider: this.rider.getDetails(),
      driver: this.driver.getDetails(),
      pickup: this.pickup,
      drop: this.drop,
      fare: this.fare,
    };
  }
  static calculateFare(pickup, drop) {
    // Simple fare calculation based on distance (dummy logic)
    const baseFare = 5; // base fare
    const distance = Math.abs(pickup - drop);
    return distance * 2 + baseFare; // $2 per unit distance + base fare
  }
  static generateRideId() {
    return "RIDE" + Math.floor(Math.random() * 10000);
  }
}

const driver1 = new Driver(1, "Alice", "1234567890", "Car - ABC123");
const driver2 = new Driver(2, "Bob", "0987654321", "Car - XYZ789");
RideService.registerDriver(driver1);
RideService.registerDriver(driver2);

const rider1 = new Rider(1, "Charlie", "5555555555");
const ride1 = rider1.requestRide(10, 20);
if (ride1) {
  console.log("Ride Details:", ride1.getRideDetails());
  ride1.driver.markRideComplete();
  console.log(
    `${
      ride1.driver.getDetails().name
    }'s Earnings: $${ride1.driver.getEarnings()}`
  );
}
