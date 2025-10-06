Task 3 — Composition (Strong Ownership)

Scenario:
A Computer has a CPU and RAM.
If the computer is destroyed, both CPU and RAM cease to exist.

👉 Requirements

Create classes CPU, RAM, and Computer.

Computer should instantiate its own CPU and RAM internally in its constructor.

Add a boot() method that calls both components’ methods:

CPU.process()

RAM.load()
