

// Counter for current song
let currentSong = 0;

// Music
const songs = [
    {
      name: 'Rising',
      displayName: 'Rising',
      artist: 'Thomas-Anstey-Lewis',
    },
    {
     name: 'Freeway',
      displayName: 'Freeway',
      artist: 'Thomas-Anstey-Lewis',
    },
    {
     name: 'Forsaken',
      displayName: 'Forsaken',
      artist: 'Thomas-Anstey-Lewis',
    },
    {
      name: 'Overcoming',
      displayName: 'Overcoming',
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
// Function to pause Song
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
  }
  
  // Update DOM
  function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
  }
  
  // Function to update progress
  function updateProgress(e) {
    if (isPlaying) {
      const { duration, currentTime } = e.srcElement;
  
      // Update Progress Bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
  
      // Calculate Display for the duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
  
      // Delay switching the duration element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
  
      // Calculate Display for the current time
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
  
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
  
  // Function to set the time of the song by clicking the progress bar
  function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
  }
  // Function for next song
function nextSong() {
    currentSong < songs.length - 1 ? currentSong++ : (currentSong = 0);
    loadSong(songs[currentSong]);
    playSong();
  }
  
  // function for previous song
  function previousSong() {
    currentSong <= 0 ? (currentSong = songs.length - 1) : currentSong--;
    loadSong(songs[currentSong]);
    playSong();
  }
  
  // On Load - Select First Song
  loadSong(songs[currentSong]);
  
  // Play or Pause Event Listener
  playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
  
  // Skip event listener
  nextBtn.addEventListener('click', nextSong);
  
  // Previous event listener
  prevBtn.addEventListener('click', previousSong);
  
  // Update progress bar
  music.addEventListener('timeupdate', updateProgress);
  
  // Play the next song when the song ends
  music.addEventListener('ended', nextSong);
  
  // Click on progress bar to search through the song
  progressContainer.addEventListener('click', setProgressBar);  