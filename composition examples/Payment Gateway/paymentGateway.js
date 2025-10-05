class CreditCardPayment {
  processPayment(amount) {
    console.log(`Processing credit card payment of $${amount}`);
  }
}

class PayPalPayment {
  processPayment(amount) {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}

class PaymentGateway {
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }
  setPaymentMethod(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }
  makePayment(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }
    this.paymentMethod.processPayment(amount);
  }
}

const gateWay = new PaymentGateway(new CreditCardPayment());
gateWay.makePayment(100);

gateWay.makePayment(200);

gateWay.setPaymentMethod(new PayPalPayment());
gateWay.makePayment(300);
