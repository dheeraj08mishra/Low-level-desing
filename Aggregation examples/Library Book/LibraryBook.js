class Library {
  #books;
  constructor() {
    this.#books = [];
  }

  addBook(book) {
    this.#books.push(book);
  }

  listBooks() {
    return this.#books;
  }
}

class Book {
  constructor(title, author, yearOfPublication) {
    this.title = title;
    this.author = author;
    this.yearOfPublication = yearOfPublication;
  }
  getDetails() {
    return {
      title: this.title,
      author: this.author,
      yearOfPublication: this.yearOfPublication,
    };
  }
}

const library = new Library();
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
const book2 = new Book("1984", "George Orwell", 1949);

library.addBook(book1);
library.addBook(book2);

console.log(library.listBooks());
