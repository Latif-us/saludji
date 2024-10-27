
const musicContainer = document.querySelector('.music-containers');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const volumeControl = document.getElementById('volume-control');
const setVolumeValue = 0.2;
let newVolumeValue;

// Song titles
const songs = ['again', 'answerme', 'bryannnn', 'cowboy', 'crossed', 'Darkest Place', 'don\'t stop me now', 'flashh', 'got to do it', 'Haha groove', 'kavi', 'kazinsky', 'Lets Play', 'madamada', 'moveOn', 'no purpose', 'outstanding', 'pleased_2', 'Project_29', 'stranger', 'teddy', 'To Love You', 'Tonight', 'waisted', 'watizlov'];

// song index
let songIndex = 0;
loadSong(songs[songIndex].toUpperCase());

// Load song info
function loadSong(song) {
    title.innerText = song.replace(/_/g, " ");
    audio.src = `music/${song}.mp3`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
    audio.play();
    volume(setVolumeValue);
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
    audio.pause();
    volume();
}

function prevSong() {
    songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
    loadSong(songs[songIndex].toUpperCase());
    playSong();
    volume(set);
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex].toUpperCase());
    playSong();
    volume();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
function volume(volumeValue) {
volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    console.log(audio.volume)
});
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
    volume();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
