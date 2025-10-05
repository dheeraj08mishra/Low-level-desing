class Speaker {
  constructor(song) {
    this.song = song;
  }
  playSound() {
    console.log(`Playing song: ${this.song}`);
  }
}

class MusicLibrary {
  #songs;
  constructor(songs) {
    this.#songs = new Set(songs);
  }
  getRandomSong() {
    const songsArray = Array.from(this.#songs);
    const randomIndex = Math.floor(Math.random() * songsArray.length);
    this.currentPlayingSong = songsArray[randomIndex];
    return songsArray[randomIndex];
  }
  addSong(song) {
    this.#songs.add(song);
  }
  removeSong(song) {
    this.#songs.delete(song);
  }
}

class MusicPlayer {
  constructor(speaker, musicLibrary) {
    this.speaker = speaker;
    this.musicLibrary = musicLibrary;
    this.currentPlayingSong = null;
  }
  playRandomSong() {
    const song = this.musicLibrary.getRandomSong();
    this.currentPlayingSong = song;
    this.speaker.song = song;

    this.speaker.playSound();
  }
  getCurrentPlayingSong() {
    return this.currentPlayingSong;
  }
}

const player1 = new MusicPlayer(
  new Speaker(),
  new MusicLibrary(["Song A", "Song B", "Song C"])
);
player1.playRandomSong();
const player2 = new MusicPlayer(
  new Speaker(),
  new MusicLibrary(["Track 1", "Track 2", "Track 3", "Track 4"])
);
player2.playRandomSong();
console.log(player1.getCurrentPlayingSong());
