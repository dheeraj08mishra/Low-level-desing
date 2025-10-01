class Account {
  #balance;
  #accountNumber;
  #ownerName;
  constructor(accountNumber, ownerName, initialBalance = 0) {
    this.#accountNumber = accountNumber;
    this.#ownerName = ownerName;
    this.#balance = initialBalance;
  }
  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
  }
  getBalance() {
    return this.#balance;
  }
  getAccountDetails() {
    return {
      accountNumber: this.#accountNumber,
      ownerName: this.#ownerName,
      balance: this.#balance,
    };
  }
  toString() {
    return `Account(${this.#accountNumber}): ${this.#ownerName}, Balance: ${
      this.#balance
    }`;
  }
}

class savingAccount extends Account {
  constructor(
    accountNumber,
    ownerName,
    initialBalance = 0,
    interestRate = 0.02
  ) {
    super(accountNumber, ownerName, initialBalance);
    this.interestRate = interestRate;
  }
  applyInterest() {
    const interest = this.getBalance() * this.interestRate;
    this.deposit(interest);
  }
}

class currentAccount extends Account {
  constructor(
    accountNumber,
    ownerName,
    initialBalance = 0,
    overdraftLimit = 500
  ) {
    super(accountNumber, ownerName, initialBalance);
    this.overdraftLimit = overdraftLimit;
  }
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    if (amount > this.getBalance() + this.overdraftLimit) {
      throw new Error("Insufficient funds including overdraft limit");
    }
    super.withdraw(amount);
  }
}

class Bank {
  #accounts;
  static totalAccounts = 0;
  constructor() {
    this.#accounts = new Map();
  }
  createAccount(type, accountNumber, ownerName, initialBalance, extraParam) {
    let account;
    if (type === "savings") {
      account = new savingAccount(
        accountNumber,
        ownerName,
        initialBalance,
        extraParam
      );
    } else if (type === "current") {
      account = new currentAccount(
        accountNumber,
        ownerName,
        initialBalance,
        extraParam
      );
    } else {
      throw new Error("Invalid account type");
    }
    this.#accounts.set(accountNumber, account);
    Bank.totalAccounts++;
    return account;
  }

  getAccount(accountNumber) {
    return this.#accounts.get(accountNumber);
  }

  transfer(fromAcc, toAcc, amount) {
    let fromAccount = this.#accounts.get(fromAcc);
    let toAccount = this.#accounts.get(toAcc);
    if (!fromAccount || !toAccount) {
      throw new Error("Account details are incorrect");
    }
    if (fromAccount.getBalance() < amount) {
      throw new Error("insuficient funds");
    }
    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
  }
}

const bank = new Bank();
const savingsAcc = bank.createAccount("savings", "SA123", "Alice", 1000, 0.03);
const currentAcc = bank.createAccount("current", "CA123", "Bob", 500, 1000);
savingsAcc.applyInterest();
currentAcc.withdraw(200);
console.log(savingsAcc.toString());
console.log(currentAcc.toString());

bank.transfer("SA123", "CA123", 100);
console.log(savingsAcc.getAccountDetails());
console.log(currentAcc.getAccountDetails());
