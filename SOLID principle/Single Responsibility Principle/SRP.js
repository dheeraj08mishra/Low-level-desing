class Reports {
  constructor(data) {
    this.data = data;
  }
  generateReport() {
    console.log("report generated for " + this.data);
  }
  saveReport() {
    console.log("report saved for " + this.data);
  }
  printReport() {
    console.log("report printed for " + this.data);
  }
}

// refactor Code

class Report {
  constructor(generate, save, print) {
    this.generator = generate;
    this.saver = save;
    this.printer = print;
  }
}

class ReportGenerator {
  generateReport(data) {
    console.log("report generated for " + data);
  }
}
class ReportSaver {
  saveReport(data) {
    console.log("report saved for " + data);
  }
}
class ReportPrinter {
  printReport(data) {
    console.log("report printed for " + data);
  }
}

let report = new Report(
  new ReportGenerator(),
  new ReportSaver(),
  new ReportPrinter()
);
report.generator.generateReport("Dheeraj");
report.saver.saveReport("Dheeraj");
report.printer.printReport("Dheeraj");
