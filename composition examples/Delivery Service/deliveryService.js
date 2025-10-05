class BikeDelivery {
  deliver(package) {
    console.log(`Delivering package ${package.id} via Bike`);
  }
}

class DroneDelivery {
  deliver(package) {
    console.log(`Delivering package ${package.id} via Drone`);
  }
}

class DeliveryService {
  constructor(deliveryMethod) {
    this.deliveryMethod = deliveryMethod;
  }
  setDeliveryMethod(deliveryMethod) {
    this.deliveryMethod = deliveryMethod;
  }
  deliveryPackage(package) {
    this.deliveryMethod.deliver(package);
  }
}

const deliveryService = new DeliveryService(new BikeDelivery());
deliveryService.deliveryPackage({ id: 1, content: "Books" });

deliveryService.setDeliveryMethod(new DroneDelivery());
deliveryService.deliveryPackage({ id: 2, content: "Electronics" });
