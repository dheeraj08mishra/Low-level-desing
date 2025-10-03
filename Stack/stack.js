class Stack {
  #items;
  constructor() {
    this.#items = [];
  }
  push(element) {
    this.#items.push(element);
  }
  isEmpty() {
    return this.#items.length === 0;
  }
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.#items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.#items[this.#items.length - 1];
  }
  size() {
    return this.#items.length;
  }
  clear() {
    this.#items = [];
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.peek()); // 20
console.log(stack.pop()); // 20
console.log(stack.size()); // 1
console.log(stack.isEmpty()); // false
stack.clear();
console.log(stack.isEmpty()); // true
