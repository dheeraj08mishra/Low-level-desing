Concepts: constructor, private fields, encapsulation, static (bank-wide rules), inheritance.
👉 Features:
Account (base class) → has owner, balance, deposit, withdraw.
SavingsAccount (extends Account) → has interest rate, method to add interest.
CurrentAccount (extends Account) → supports overdraft up to a limit.
Bank class → static property to track total accounts created.
