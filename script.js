const audio = document.getElementById("audio");
const circle_img = document.getElementById("circle_image");
const background_img = document.getElementById("background_image");
const play_btn = document.getElementById("play");
const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");
const music_name = document.getElementById("music_name");
const artist_name = document.getElementById("artist_name");
const start_time = document.querySelector(".start_time");
const end_time = document.querySelector(".end_time");
const progress = document.querySelector(".progress");
const progress_bar = document.querySelector(".progress_bar");
// const progressBtn = document.querySelector(".progress");

const data = [
  {
    music_src: "./music/music1.mp3",
    image_src: "./images/Music1.jpg",
    music_name: "Saki Saki",
    artist_name: "Neha Kakkar",
  },
  {
    music_src: "./music/music2.mp3",
    image_src: "./images/Music2.jpg",
    music_name: "Garmi",
    artist_name: "Baadshah",
  },
  {
    music_src: "./music/music3.mp3",
    image_src: "./images/Music3.jpg",
    music_name: "Koka",
    artist_name: "Baadshah",
  },
];

const state = {
  isPlayMusic: false,
  current: 0,
  isChangeSongDuration: false,
};

const formatSecondsAsTime = (secs) => {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min == NaN || sec == NaN) {
    return (sec = 00), (min = 00);
  } else {
    return min + ":" + sec;
  }
};

const setData = (data_id) => {
  circle_img.src = data[data_id].image_src;
  background_img.src = data[data_id].image_src;
  music_name.innerText = data[data_id].music_name;
  artist_name.innerText = data[data_id].artist_name;
  audio.src = data[data_id].music_src;
};

const next_song = () => {
  if (state.current === data.length) return setData(0);
  state.current += 1;
  setData(state.current);
  playmusic();
};

const prev_song = () => {
  if (state.current < 0) return setData(data.length - 1);
  state.current -= 1;
  setData(state.current);
  playmusic();
};

const playmusic = () => {
  audio.play();
  state.isPlayMusic = true;
  circle_img.classList.add("image_rotate");
  circle_img.classList.add("img_shadow");
  play_btn.classList.remove("fa-play");
  play_btn.classList.add("fa-pause");
};
const pausemusic = () => {
  audio.pause();
  state.isPlayMusic = false;
  circle_img.classList.remove("image_rotate");
  circle_img.classList.remove("img_shadow");
  play_btn.classList.remove("fa-pause");
  play_btn.classList.add("fa-play");
};

audio.addEventListener("loadedmetadata", () => {
  end_time.innerText = formatSecondsAsTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  const percentage_value = Math.ceil(
    (audio.currentTime / audio.duration) * 100
  );

  if (!state.isChangeSongDuration) {
    progress.style.width = `${percentage_value}%`;
  }
  start_time.innerText = formatSecondsAsTime(audio.currentTime);

  if (audio.currentTime === audio.duration) next_song();
});

play_btn.addEventListener("click", () => {
  state.isPlayMusic ? pausemusic() : playmusic();
});

next_btn.addEventListener("click", next_song);

prev_btn.addEventListener("click", prev_song);

progress_bar.addEventListener("mousemove", (e) => {
  state.isChangeSongDuration = true;
  const percentage = Math.ceil((e.offsetX / progress_bar.offsetWidth) * 100);
  progress.style.width = `${percentage}%`;
});

progress_bar.addEventListener("mouseleave", () => {
  state.isChangeSongDuration = false;
});

progress_bar.addEventListener("click", (e) => {
  const percentage = Math.ceil((e.offsetX / progress_bar.offsetWidth) * 100);
  progress.style.width = `${percentage}%`;

  const thumbPosition = Math.ceil((audio.duration * percentage) / 100);
  audio.currentTime = thumbPosition;
});

window.onload = () => {
  setData(state.current);
};
