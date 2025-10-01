class Item {
  #id;
  #title;
  #author;
  #publisher;
  #yearOfPublication;
  #isAvailable;
  constructor(id, title, author, publisher, yearOfPublication) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#publisher = publisher;
    this.#yearOfPublication = yearOfPublication;
    this.#isAvailable = true;
  }
  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getAuthor() {
    return this.#author;
  }

  getPublisher() {
    return this.#publisher;
  }

  getYearOfPublication() {
    return this.#yearOfPublication;
  }

  isAvailable() {
    return this.#isAvailable;
  }

  setAvailability(status) {
    this.#isAvailable = status;
  }
}
class Book extends Item {
  #availableCopies;
  constructor(
    id,
    title,
    author,
    publisher,
    yearOfPublication,
    genre,
    availableCopies = 1
  ) {
    super(id, title, author, publisher, yearOfPublication);
    this.genre = genre;
    this.#availableCopies = availableCopies;
  }

  getGenre() {
    return this.genre;
  }

  getAvailableCopies() {
    return this.#availableCopies;
  }

  setAvailableCopies(copies) {
    this.#availableCopies = copies;
  }
  hasISBN() {
    return true;
  }
}

class Magazine extends Item {
  #issueNumber;
  constructor(id, title, author, publisher, yearOfPublication, issueNumber) {
    super(id, title, author, publisher, yearOfPublication);
    this.#issueNumber = issueNumber;
  }

  getIssueNumber() {
    return this.#issueNumber;
  }
  hasISBN() {
    return false;
  }
}
class Library {
  #items;
  constructor() {
    this.#items = new Map();
  }
  addItem(item) {
    if (!(item instanceof Item)) {
      throw new Error("Only items of type Item can be added");
    }
    this.#items.set(item.getId(), item);
  }
  removeItem(itemId) {
    if (!this.#items.has(itemId)) {
      throw new Error("Item not found in the library");
    }
    this.#items.delete(itemId);
  }
  findItem(title) {
    const results = [];
    for (let item of this.#items.values()) {
      if (item.getTitle().toLowerCase().includes(title.toLowerCase())) {
        results.push(item);
      }
    }
    return results;
  }

  borrowItem(itemId) {
    const item = this.#items.get(itemId);
    if (!item) throw new Error("Item not found");
    if (!item.isAvailable()) throw new Error("Item not available");
    if (item instanceof Book) {
      if (item.getAvailableCopies() <= 0)
        throw new Error("No copies available");
      item.setAvailableCopies(item.getAvailableCopies() - 1);
      if (item.getAvailableCopies() === 0) {
        item.setAvailability(false);
      }
    }
  }
  returnItem(itemId) {
    const item = this.#items.get(itemId);
    if (!item) throw new Error("Item not found");
    if (item instanceof Book) {
      item.setAvailableCopies(item.getAvailableCopies() + 1);
      item.setAvailability(true);
    }
  }
}

const library = new Library();
const book1 = new Book(
  1,
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  "Scribner",
  1925,
  "Fiction",
  3
);
const magazine1 = new Magazine(
  2,
  "National Geographic",
  "Various",
  "National Geographic Partners",
  2023,
  5
);

library.addItem(book1);
library.addItem(magazine1);

console.log(library.findItem("great")); // Should return the book1 details

library.borrowItem(1);
console.log(book1.getAvailableCopies()); // Should return 2

library.returnItem(1);
console.log(book1.getAvailableCopies()); // Should return 3
