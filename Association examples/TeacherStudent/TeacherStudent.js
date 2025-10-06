class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Teacher {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
  }

  teach(student) {
    console.log(`${this.name} is teaching ${this.subject} to ${student.name}`);
  }
}

const teacher1 = new Teacher("Mr. Smith", "Math");
const student1 = new Student("Alice", 14);
const student2 = new Student("Bob", 15);
teacher1.teach(student1); // Mr. Smith is teaching Math to Alice
teacher1.teach(student2); // Mr. Smith is teaching Math to Bob
