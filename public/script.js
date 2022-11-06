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
var jsmediatags = window.jsmediatags;

let data = [];

const getFolderData = async () => {
  data = await (await fetch("/getFile")).json();
};

window.onload = getFolderData();

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

const getImage = (imgArr) => {
  return btoa(
    imgArr.reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
};

const setData = (data_id) => {
  audio.src = data[data_id];
  jsmediatags.read(`${data[data_id]}`, {
    onSuccess: (data) => {
      music_name.innerText = data.tags?.title || "Unknown";
      artist_name.innerText = data.tags?.artist || "Unkonwn";
      circle_img.src = background_img.src = data.tags.picture
        ? `data:${data.tags.picture.format};base64,${getImage(
            data.tags.picture.data
          )}`
        : (circle_img.src = background_img.src =
            "https://i.pinimg.com/originals/01/d1/b4/01d1b4547ce03c3ec499c827caac4a72.jpg");
    },

    onError: (err) => {
      console.log(err);
    },
  });
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

const next_song = () => {
  console.log(state.current);
  if (state.current === data.length - 1) {
    setData(0);
    state.current = 0;
    playmusic();
    return
  }

  state.current += 1;
  setData(state.current);
  playmusic();
};

const prev_song = () => {
  if (state.current <= 0) {
    state.current = data.length - 1
    setData(data.length - 1)
    playmusic();
    return
  };
  state.current -= 1;
  setData(state.current);
  playmusic();
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

progress_bar.addEventListener("touchmove", (e) => {
  state.isChangeSongDuration = true;
  const percentage = Math.ceil((e.offsetX / progress_bar.offsetWidth) * 100);
  progress.style.width = `${percentage}%`;
});

progress_bar.addEventListener("touchleave", () => {
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
