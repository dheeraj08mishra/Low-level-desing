class PaymentService {
  constructor(paymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  processPayment(amount) {
    return this.paymentGateway.pay(amount);
  }
}
class creditCardGateway {
  pay(amount) {
    console.log(`Processing credit card payment of $${amount}`);
    // Logic for processing credit card payment
    return true;
  }
}

class paypalGateway {
  pay(amount) {
    console.log(`Processing PayPal payment of $${amount}`);
    // Logic for processing PayPal payment
    return true;
  }
}

// Usage
const creditCardPaymentService = new PaymentService(new creditCardGateway());
creditCardPaymentService.processPayment(100);

const paypalPaymentService = new PaymentService(new paypalGateway());
paypalPaymentService.processPayment(200);
