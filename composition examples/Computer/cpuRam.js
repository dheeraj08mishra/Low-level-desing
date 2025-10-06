class CPU {
  process() {
    console.log("Processing data...");
  }
}
class RAM {
  load() {
    console.log("Loading data into RAM...");
  }
}

class Computer {
  constructor(cpu, ram) {
    this.cpu = cpu || new CPU();
    this.ram = ram || new RAM();
  }
  boot() {
    this.ram.load();
    this.cpu.process();
  }

  shutdown() {
    console.log("Shutting down the computer...");
    this.ram = null;
    this.cpu = null;
  }
}

const myComputer = new Computer();
myComputer.boot();
myComputer.shutdown();
