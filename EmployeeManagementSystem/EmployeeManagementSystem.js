class Person {
  #name;
  #age;
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  getDetails() {
    return { name: this.#name, age: this.#age };
  }
}

class Employee extends Person {
  #salary;
  #department;
  constructor(name, age, salary, department) {
    super(name, age);
    this.#salary = salary;
    this.#department = department;
  }

  getDepartment() {
    return this.#department;
  }
  work() {
    return `${this.getDetails().name} is working in ${
      this.#department
    } department.`;
  }
  getSalary() {
    return this.#salary;
  }
}

class Manager extends Employee {
  #team;
  constructor(name, age, salary, department, team = []) {
    super(name, age, salary, department);
    this.#team = team;
  }
  getTeam() {
    return this.#team;
  }
  addTeamMember(employee) {
    if (!(employee instanceof Employee)) {
      throw new Error("Only Employee instances can be added to the team.");
    }
    this.#team.push(employee);
  }
  work() {
    return `${this.getDetails().name} is managing a team of ${
      this.#team.length
    } in ${this.getDepartment()} department.`;
  }
}

class HRSystem {
  static employees = [];
  static addEmployee(employee) {
    if (employee instanceof Employee) {
      this.employees.push(employee);
    } else {
      throw new Error("Only Employee instances can be added.");
    }
  }
  static getEmployeeCount() {
    return this.employees.length;
  }
  static generateDepartmentReport() {
    const deptStats = {};
    this.employees.forEach((emp) => {
      const dept = emp.getDepartment();
      if (!deptStats[dept]) deptStats[dept] = { count: 0, totalSalary: 0 };
      deptStats[dept].count++;
      deptStats[dept].totalSalary += emp.getSalary();
    });
    return deptStats;
  }
}

// Example Usage
const emp1 = new Employee("Alice", 30, 50000, "Engineering");
const emp2 = new Employee("Bob", 28, 45000, "Marketing");
const mgr1 = new Manager("Charlie", 40, 80000, "Engineering", [emp1]);

HRSystem.addEmployee(emp1);
HRSystem.addEmployee(emp2);
HRSystem.addEmployee(mgr1);

console.log(emp1.work()); // Alice is working in Engineering department.
console.log(mgr1.work()); // Charlie is managing the team in Engineering department.
console.log(HRSystem.generateDepartmentReport()); // { Engineering: { count: 2, totalSalary: 130000 }, Marketing: { count: 1, totalSalary: 45000 } }
