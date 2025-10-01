Library Management System
Concepts: inheritance, super, encapsulation, getters/setters.

👉 Features:
Item (base class) → has title, author, publishYear.
Book (extends Item) → has ISBN, available copies.
Magazine (extends Item).
Library → manages collection of items, addItem(), removeItem(), findItem().
Use private field for copies → can only be updated via borrow() and return().
