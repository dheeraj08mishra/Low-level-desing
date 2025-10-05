Music Player System
Create classes:
Speaker → method: playSound(song) logs: Playing song: <song>
MusicLibrary → holds an array of songs, method getRandomSong() returns one.
MusicPlayer → has both Speaker and MusicLibrary.

Method playRandomSong() → picks a random song and plays it using Speaker.

👉 Concept: MusicPlayer has-a Speaker and has-a MusicLibrar
