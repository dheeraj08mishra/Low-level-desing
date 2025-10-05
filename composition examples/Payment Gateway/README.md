Payment Gateway (Strategy Pattern)

Create:

CreditCardPayment → method pay(amount) logs "Paid <amount> via Credit Card".

PaypalPayment → method pay(amount) logs "Paid <amount> via PayPal".

PaymentProcessor → accepts a payment strategy, has processPayment(amount) that delegates to chosen method.

👉 Concept: Composition for interchangeable strategies.
