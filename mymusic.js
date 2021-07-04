const audio = document.querySelector('audio');
const play_btn = document.getElementById('play');
const img = document.querySelector('img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const name = document.getElementById('music_name');
const artist = document.getElementById('artist');
const durapoint = document.querySelector('.range');
const stime = document.querySelector('.stime');
const ftime = document.querySelector('.ftime');
const range = document.getElementById('range');
const p = document.getElementById('demo');
let playing = false;
let playfb = true;
var msrc = ["./music/Music1.mp3", "./music/Music2.mp3", "./music/Music3.mp3", "./music/Music4.mp3"];
var isrc = ["./images/Music1.jpg", "./images/Music2.jpg", "./images/Music3.jpg", "./images/Music4.jpg"];
var sname = ["Saki Saki", "Garmi", "Koka", "Fikar Not"]
var aname = ["Neha Kakkar", "Baadshah", "Baadshah", "Chichore"]
var i = 0;
audio.pause();
const playmusic = () => {
	audio.play();
	img.classList.add("irota");
	img.classList.add("imgshadow");
	play_btn.classList.remove("fa-play");
	play_btn.classList.add("fa-pause");
	playing = true;

}
const pausemusic = () => {
	audio.pause();
	img.classList.remove("irota");
	img.classList.remove("imgshadow");
	play_btn.classList.remove("fa-pause");
	play_btn.classList.add("fa-play");
	playing = false;
}

play.addEventListener('click', () => {


	playing ? pausemusic() : playmusic();
});

//Prev button ---->
prev.addEventListener('click', () => {
	i--;
	if (i < 0) {
		i = msrc.length - 1;
	}

	if (a = "[object Promise]") {
		play_btn.classList.add("fa-pause");
	}

	if (playfb) {
		playmusic();
	}

	img.src = isrc[i];
	audio.src = msrc[i];
	name.innerHTML = sname[i];
	artist.innerHTML = aname[i];
	img.classList.remove("irota");
	img.classList.remove("imgshadow");
	prev.classList.add("prev");
	playfb = false;
	setTimeout(() => {
		img.classList.add("irota");
		img.classList.add("imgshadow");

	}, 300)

	setTimeout(() => {
		prev.classList.remove("prev");
	}, 400)
});

//Next button ---->
next.addEventListener('click', () => {
	i++;
	if (i >= msrc.length) {
		i = 0;
	}

	if (a = "[object Promise]") {
		play_btn.classList.add("fa-pause");
	}

	if (playfb) {
		playmusic();
	}

	img.src = isrc[i];
	audio.src = msrc[i]
	name.innerHTML = sname[i];
	artist.innerHTML = aname[i];
	img.classList.remove("irota");
	img.classList.remove("imgshadow");
	next.classList.add("next")
	playfb = false;
	setTimeout(() => {
		img.classList.add("irota");
		img.classList.add("imgshadow");
	}, 300)
	setTimeout(() => {
		next.classList.remove("next");
	}, 400)
});

//Progress bar

durapoint.addEventListener('change', () => {
	audio.currentTime = durapoint.value;
})


audio.addEventListener('timeupdate', () => {
	durapoint.max = audio.duration;
	durapoint.value = audio.currentTime;

	stime.innerHTML = formatSecondsAsTime(audio.duration);
	ftime.innerHTML = formatSecondsAsTime(audio.currentTime);
})


function formatSecondsAsTime(secs) {
	var hr = Math.floor(secs / 3600);
	var min = Math.floor((secs - (hr * 3600)) / 60);
	var sec = Math.floor(secs - (hr * 3600) - (min * 60));

	if (min < 10) {
		min = "0" + min;
	}
	if (sec < 10) {
		sec = "0" + sec;
	}
	if (min == NaN || sec == NaN) {
		return sec = 00, min = 00;
	} else {
		return min + ':' + sec;
	}
}


setInterval(() => {
	acur = audio.currentTime;
	adur = audio.duration;
	if (acur == adur) {
		i++;
		if (i >= msrc.length) {
			i = 0;
		}
		img.src = isrc[i];
		audio.src = msrc[i];
		name.innerHTML = sname[i];
		artist.innerHTML = aname[i];
		playmusic();
	}

}, 500)

/*setInterval(()=>{
console.log(i)
},5000)*/

