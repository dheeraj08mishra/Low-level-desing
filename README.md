COMPOSITION PRACTICE TASKS

These are short and focused — ideal to strengthen your grasp of “has-a” relationships.

🧩 Task 1: Music Player System

Create classes:

Speaker → method: playSound(song) logs: Playing song: <song>

MusicLibrary → holds an array of songs, method getRandomSong() returns one.

MusicPlayer → has both Speaker and MusicLibrary.

Method playRandomSong() → picks a random song and plays it using Speaker.

👉 Concept: MusicPlayer has-a Speaker and has-a MusicLibrary.

💳 Task 2: Payment Gateway (Strategy Pattern)

Create:

CreditCardPayment → method pay(amount) logs "Paid <amount> via Credit Card".

PaypalPayment → method pay(amount) logs "Paid <amount> via PayPal".

PaymentProcessor → accepts a payment strategy, has processPayment(amount) that delegates to chosen method.

👉 Concept: Composition for interchangeable strategies.
