Ride-Sharing (Uber/Ola Style)
Concepts: classes, inheritance, this, polymorphism, encapsulation.
👉 Features:
User (base class).
Rider (extends User) → requestRide(pickup, drop).
Driver (extends User) → acceptRide(), markRideComplete().
Ride → holds ride details (pickup, drop, fare).
RideService (static methods) → match riders with drivers.
Keep private field #earnings for driver.
