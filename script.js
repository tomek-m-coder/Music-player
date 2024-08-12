

// Counter for current song
let currentSong = 0;

// Music
const songs = [
    {
      name: 'Rising',
      displayName: 'Adventure-Type-Beat',
      artist: 'Thomas-Anstey-Lewis',
    },
    {
     name: 'Freeway',
      displayName: 'Adventure-Type-Beat',
      artist: 'Thomas-Anstey-Lewis',
    },
    {
     name: 'Forsaken',
      displayName: 'Adventure-Type-Beat',
      artist: 'Thomas-Anstey-Lewis',
    },
    {
      name: 'Overcoming',
      displayName: 'Adventure-Type-Beat',
      artist: 'Thomas-Anstey-Lewis',
    },
  ];
  // Check if song is playing
let isPlaying = false;

// Function to get elements by id
function getElem(id) {
  return document.querySelector(id);
}
// Function to Play Song
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
  }
  