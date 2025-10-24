// Order Processing System adhering to SOLID principles
// Single Responsibility Principle: Each class has a single responsibility.

class Order {
  constructor(orderId, customerId, items) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.items = items; // array of item objects
    this.status = "Pending";
  }
}

class CalculateTotal {
  calculate(order) {
    for (let i = 0; i < order.items.length; i++) {
      order.totalAmount += order.items[i].price * order.items[i].quantity;
    }
    return order.totalAmount;
  }
}
class SaveOrder {
  save(order) {
    // Simulate saving order to a database
    console.log(`Order ${order.orderId} saved to database.`);
  }
}
class ProcessPayment {
  process(order, paymentDetails) {
    // Simulate payment processing logic
    if (paymentDetails.valid) {
      order.status = "Paid";
      return true;
    } else {
      order.status = "Payment Failed";
      return false;
    }
  }
}

class NotifyCustomer {
  notify(order, message) {
    // Simulate notification logic
    console.log(`Notification to Customer ${order.customerId}: ${message}`);
  }
}

// Open/Closed Principle: Classes are open for extension but closed for modification.

class DiscountStrategy {
  applyDiscount(order) {
    return order.totalAmount;
  }
}

class PercentageDiscount extends DiscountStrategy {
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }
  applyDiscount(order) {
    return order.totalAmount * (1 - this.percentage / 100);
  }
}

class FixedAmountDiscount extends DiscountStrategy {
  constructor(amount) {
    super();
    this.amount = amount;
  }
  applyDiscount(order) {
    return order.totalAmount - this.amount;
  }
}

// Liskov Substitution Principle: Subclasses can replace their base classes without affecting the correctness of the program.

class DiscountTotalCalculator extends CalculateTotal {
  constructor(discountStrategy) {
    super();
    this.discountStrategy = discountStrategy;
  }
  calculate(order) {
    const total = super.calculate(order);
    return this.discountStrategy.applyDiscount(order);
  }
}

// Example usage:
const order = new Order(1, 101, [
  { name: "Item1", price: 100, quantity: 2 },
  { name: "Item2", price: 50, quantity: 1 },
]);

const totalCalculator = new DiscountTotalCalculator(new PercentageDiscount(10));
const totalAmount = totalCalculator.calculate(order);
console.log(`Total Amount after discount: ${totalAmount}`);

const paymentProcessor = new ProcessPayment();
const paymentDetails = { valid: true };
const paymentStatus = paymentProcessor.process(order, paymentDetails);
console.log(`Payment Status: ${order.status}`);

const orderSaver = new SaveOrder();
orderSaver.save(order);

const notifier = new NotifyCustomer();
notifier.notify(
  order,
  `Your order total is ${totalAmount} and payment status is ${order.status}.`
);

// Interface Segregation Principle: Clients should not be forced to depend on interfaces they do not use.

class EmailNotifier {
  sendEmail(customerId, message) {
    // Simulate sending email
    console.log(`Email sent to Customer ${customerId}: ${message}`);
  }
}

class SMSNotifier {
  sendSMS(customerId, message) {
    // Simulate sending SMS
    console.log(`SMS sent to Customer ${customerId}: ${message}`);
  }
}

// Example usage of notifiers
const emailNotifier = new EmailNotifier();
emailNotifier.sendEmail(order.customerId, "Your order has been processed.");

const smsNotifier = new SMSNotifier();
smsNotifier.sendSMS(order.customerId, "Your order is on the way!");

// Dependency Inversion Principle: High-level modules should not depend on low-level modules; both should depend on abstractions.
class PaymentGateway {
  pay(order, paymentDetails) {
    throw new Error("Method 'pay()' must be implemented.");
  }
}

class CreditCardPayment extends PaymentGateway {
  pay(order, paymentDetails) {
    // Implement credit card payment logic
    console.log("Processing credit card payment...");
    return true;
  }
}

class PayPalPayment extends PaymentGateway {
  pay(order, paymentDetails) {
    // Implement PayPal payment logic
    console.log("Processing PayPal payment...");
    return true;
  }
}

// Example usage of PaymentGateway
const creditCardPayment = new CreditCardPayment();
creditCardPayment.pay(order, paymentDetails);

const payPalPayment = new PayPalPayment();
payPalPayment.pay(order, paymentDetails);

class OrderProcessingSystem {
  constructor(
    totalCalculator,
    paymentProcessor,
    orderSaver,
    notifier,
    paymentGateway
  ) {
    this.totalCalculator = totalCalculator;
    this.paymentProcessor = paymentProcessor;
    this.orderSaver = orderSaver;
    this.notifier = notifier;
    this.paymentGateway = paymentGateway;
  }

  processOrder(order, paymentDetails) {
    const totalAmount = this.totalCalculator.calculate(order);
    console.log(`Total Amount after discount: ${totalAmount}`);

    const paymentStatus = this.paymentProcessor.process(order, paymentDetails);
    console.log(`Payment Status: ${order.status}`);

    this.orderSaver.save(order);

    this.notifier.notify(
      order,
      `Your order total is ${totalAmount} and payment status is ${order.status}.`
    );

    this.paymentGateway.pay(order, paymentDetails);
  }
}

// Example usage of OrderProcessingSystem
const orderProcessingSystem = new OrderProcessingSystem(
  totalCalculator,
  paymentProcessor,
  orderSaver,
  notifier,
  creditCardPayment
);

orderProcessingSystem.processOrder(order, paymentDetails);
