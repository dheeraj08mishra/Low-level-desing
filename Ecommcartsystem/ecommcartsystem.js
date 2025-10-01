class Product {
  #id;
  #name;
  #price;
  constructor(id, name, price) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
  }
  getDetails() {
    return {
      id: this.#id,
      name: this.#name,
      price: this.#price,
    };
  }
}

class CartItem {
  #product;
  #quantity;
  constructor(product, quantity) {
    this.#product = product;
    this.#quantity = quantity;
  }
  getProduct() {
    return this.#product;
  }
  getQuantity() {
    return this.#quantity;
  }
  setQuantity(quantity) {
    if (quantity <= 0) {
      throw new Error("Quantity must be positive");
    }
    this.#quantity = quantity;
  }
  getTotalPrice() {
    return this.#product.getDetails().price * this.#quantity;
  }
}

class Cart {
  #items;
  #totalPrice;
  constructor() {
    this.#items = new Map();
    this.#totalPrice = 0;
  }
  addItem(product, quantity) {
    if (this.#items.has(product.getDetails().id)) {
      const exisitingItem = this.#items.get(product.getDetails().id);
      exisitingItem.setQuantity(exisitingItem.getQuantity() + quantity);
    } else {
      const newItem = new CartItem(product, quantity);
      this.#items.set(product.getDetails().id, newItem);
    }
  }
  removeItem(productId) {
    if (this.#items.has(productId)) {
      this.#items.delete(productId);
    } else {
      throw new Error("Product not found in cart");
    }
  }
  getTotal() {
    let total = 0;
    for (let item of this.#items.values()) {
      total += item.getTotalPrice();
    }
    this.#totalPrice = total;
    return this.#totalPrice;
  }
  getItems() {
    return Array.from(this.#items.values());
  }
}

class Discount {
  #code;
  #percentage;
  constructor(code, percentage) {
    this.#code = code;
    this.#percentage = percentage;
  }
  static applyDiscount(cart, code) {
    const discounts = {
      SAVE10: 10,
      SAVE20: 20,
      SAVE30: 30,
    };
    if (discounts[code]) {
      const discountPercentage = discounts[code];
      const total = cart.getTotal();
      const discountedTotal = total - (total * discountPercentage) / 100;
      return discountedTotal;
    }
    throw new Error("Invalid discount code");
  }
  getCode() {
    return this.#code;
  }
  getPercentage() {
    return this.#percentage;
  }
}

class User {
  #username;
  #cart;
  constructor(username) {
    this.#username = username;
    this.#cart = new Cart();
  }
  getUsername() {
    return this.#username;
  }
  getCart() {
    return this.#cart;
  }
  addToCart(product, quantity) {
    this.#cart.addItem(product, quantity);
  }
  removeFromCart(productId) {
    this.#cart.removeItem(productId);
  }
  viewCart() {
    return this.#cart.getItems();
  }
  checkout(discountCode) {
    let total = this.#cart.getTotal();
    if (discountCode) {
      total = Discount.applyDiscount(this.#cart, discountCode);
    }
    return total;
  }
}

const prod1 = new Product(1, "Laptop", 100000);
const prod2 = new Product(2, "Smartphone", 50000);
const user = new User("dheeraj");
user.addToCart(prod1, 1);
user.addToCart(prod2, 2);
console.log("Cart Items:", user.viewCart());
console.log("Total before discount:", user.checkout());
console.log("Total after discount (SAVE10):", user.checkout("SAVE10"));
