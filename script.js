const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

const songs = [
    { name: "song1.mp3", title: "Zaroori Tha ", artist: "Rahat Fateh Ali Khan" },
    { name: "song2.mp3", title: "Kahani Suno 2.0 ", artist: "Kaifi Khalil" },
    { name: "song3.mp3", title: "Chill Vibes", artist: "Luna" }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = `music/${song.name}`;
}
function playPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
}
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}
function setVolume(value) {
    audio.volume = value;
}

audio.addEventListener("ended", nextSong);
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => {
        songIndex = index;
        loadSong(song);
        audio.play();
    };
    playlistEl.appendChild(li);
});
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}
loadSong(songs[songIndex]);
