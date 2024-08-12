// Elementy DOM
const image = getElem('img');
const title = getElem('#title');
const artist = getElem('#artist');
const music = getElem('audio');
const progressContainer = getElem('#progress-container');
const progress = getElem('#progress');
const currentTimeEl = getElem('#current-time');
const durationEl = getElem('#duration');
const prevBtn = getElem('#prev');
const playBtn = getElem('#play');
const nextBtn = getElem('#next');
const volumeSlider = getElem('#volume-slider');

// Zmienna do przechowywania AudioContext
let audioContext, analyser, dataArray, animationId;

// Zmienna do śledzenia aktualnie odtwarzanej piosenki
let currentSong = 0;

// Lista piosenek
const songs = [
  {
    name: 'Vol. 1',
    displayName: 'Rising',
    artist: 'Thomas Anstey-Lewis',
  },
  {
    name: 'Vol. 2',
    displayName: 'Freeway',
    artist: 'Thomas Anstey-Lewis',
  },
  {
    name: 'Vol. 3',
    displayName: 'Forsaken',
    artist: 'Thomas Anstey-Lewis',
  },
  {
    name: 'Vol. 4',
    displayName: 'Overcoming',
    artist: 'Thomas Anstey-Lewis',
  },
];

// Sprawdzenie, czy piosenka jest odtwarzana
let isPlaying = false;

// Funkcja do pobierania elementów
function getElem(id) {
  return document.querySelector(id);
}

// Funkcja do odtwarzania piosenki
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
  startVisualization();  // Rozpoczęcie wizualizacji
}

// Funkcja do pauzowania piosenki
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
  cancelAnimationFrame(animationId);  // Zatrzymanie wizualizacji
}

// Funkcja do załadowania piosenki
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jfif`;
}

// Funkcja do aktualizacji paska postępu
function updateProgress(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Aktualizacja szerokości paska postępu
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Obliczanie wyświetlania czasu trwania
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Opóźnienie przełączania elementu duration, aby uniknąć NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Obliczanie wyświetlania bieżącego czasu
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Funkcja do ustawiania czasu piosenki przez kliknięcie na pasek postępu
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Funkcja do odtwarzania następnej piosenki
function nextSong() {
  currentSong < songs.length - 1 ? currentSong++ : (currentSong = 0);
  loadSong(songs[currentSong]);
  playSong();
}

// Funkcja do odtwarzania poprzedniej piosenki
function previousSong() {
  currentSong <= 0 ? (currentSong = songs.length - 1) : currentSong--;
  loadSong(songs[currentSong]);
  playSong();
}

// Inicjalizacja kontekstu audio i analizatora
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(music);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }
}

// Funkcja do zmiany koloru tła na podstawie muzyki
function changeBackgroundColor() {
  analyser.getByteFrequencyData(dataArray);
  const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
  const red = Math.min(255, avg * 2);
  const green = 100;
  const blue = 255 - red;
  document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  animationId = requestAnimationFrame(changeBackgroundColor);
}

// Funkcja do rozpoczęcia wizualizacji
function startVisualization() {
  initAudioContext();
  changeBackgroundColor();
}

// Funkcja do zmiany głośności
function changeVolume(e) {
  music.volume = e.target.value;
}

// Ładowanie pierwszej piosenki przy uruchomieniu strony
loadSong(songs[currentSong]);

// Obsługa zdarzeń dla przycisków
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', previousSong);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
volumeSlider.addEventListener('input', changeVolume);
