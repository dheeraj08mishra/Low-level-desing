features:

- Product → has id, name, price.
- CartItem → product + quantity.
- Cart → maintains list of CartItems, with addItem(), removeItem(), getTotal().
- Discount (static utility) → apply discount codes.
- User → has username and cart.
- Encapsulation: total price is private, accessible only via getTotal().
