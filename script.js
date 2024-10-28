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

// Song titles
const songs = ['again', 'answerme', 'Bryan','bryannnn', 'cowboy', 'crossed', 'Darkest Place', 'do not rush things' , "don't stop me now", 'flashh', 'got to do it', 'Habiba','Haha groove', 'imdown', 'kavi', 'kazinsky', 'Last Mile', 'Lets Play', 'madamada', 'moveOn', 'no purpose', 'outstanding', 'pleased_2', 'Project_11', 'Project_29', 'Project_33', 'Project_40', 'Project_54', 'Soloing Life', 'stranger', 'Synthwave', 'teddy', 'Through the night', 'To Love You', 'Tonight', 'Vice City', 'waisted', 'watizlov'];

// song index
let songIndex = 0;
loadSong(songs[songIndex]);

// Load song info
function loadSong(song) {
    title.innerText = song.replace(/_/g, " ").toUpperCase();
    audio.src = `music/${song}.mp3`;
    audio.volume = setVolumeValue; // Initial volume
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
    audio.pause();
}

function prevSong() {
    songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

const setProgress = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
};

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
