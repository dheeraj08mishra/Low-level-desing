class Document {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
  print() {
    console.log(`Title: ${this.title}\nContent: ${this.content}`);
  }
}

class BasicPrinter {
  printDocument(document) {
    document.print();
  }
}
class Scanner {
  scanDocument(document) {
    console.log(`Scanning document: ${document.title}`);
  }
}

class AllInOnePrinter {
  constructor() {
    this.printer = new BasicPrinter();
    this.scanner = new Scanner();
  }
  printDocument(document) {
    this.printer.printDocument(document);
  }
  scanDocument(document) {
    this.scanner.scanDocument(document);
  }
}

// Usage
const myDocument = new Document(
  "My Doc",
  "This is the content of my document."
);
const basicPrinter = new BasicPrinter();
basicPrinter.printDocument(myDocument);

const scanner = new Scanner();
scanner.scanDocument(myDocument);

const allInOne = new AllInOnePrinter();
allInOne.printDocument(myDocument);
allInOne.scanDocument(myDocument);
