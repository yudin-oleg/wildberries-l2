let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume-show');
let slider = document.querySelector('#duration-slider');
let artist = document.querySelector('#artist');
let allDuration = document.querySelector("#all-duration");
let currentTime = document.querySelector("#current-time");
let waves = document.querySelector("#wavesurfer");
// let wavesurferContainer = document.getElementById("#wavesurfer");
let playList = []; //favorites

let timer;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [
	{
		name: "Трек 1",
		path: "../src/assets/audio/song1.mp3",
		singer: "Исполнитель 1"
	},
	{
		name: "Трек 2",
		path: "../src/assets/audio/song2.mp3",
		singer: "Исполнитель 2"
	},
	{
		name: "Трек 3",
		path: "../src/assets/audio/song3.mp3",
		singer: "Исполнитель 3"
	},
	{
		name: "Трек 4",
		path: "../src/assets/audio/song4.mp3",
		singer: "Исполнитель 4"
	},
	{
		name: "Трек 5",
		path: "../src/assets/audio/song5.mp3",
		singer: "Исполнитель 5"
	}
];

// Create a Wavesurfer instance and link it to the existing audio element
let wavesurfer;

function WaveSurferCreate(){
	wavesurfer = WaveSurfer.create({
		container: "#wavesurfer",
		waveColor: "#148F77",
		progressColor: "#16574a",
		hideScrollBar: true,
		cursorColor: "#16574a",
		cursorWidth: 2,
		responsive: false,
		interact: false,
		barWidth: 5,
		barGap: 1.5,
		skipLength: 5,
		url: track.src,
	});
}

// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    // очистить wavesurfer от предыдщей песни и создать для новой
	waves.innerHTML = "";
	WaveSurferCreate();

	// Update the total duration
	track.addEventListener('loadedmetadata', function() {
		const totalMinutes = Math.floor(track.duration / 60);
		const totalSeconds = Math.floor(track.duration % 60);
		allDuration.innerHTML = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
	});

	timer = setInterval(range_slider ,1000);
}

load_track(index_no);

wavesurfer.on("interaction", () => {
    wavesurfer.play();
});
console.log(wavesurfer.url);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}

// checking.. the song is playing or not
function justplay(){
	if(Playing_song==false){
		playsong();

	}else{
		pausesong();
	}
}

// reset song slider
function reset_slider(){
	slider.value = 0;
}

// play song
function playsong(){
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
	// let wavePromise = wavesurfer.play();
	// if (wavePromise !== undefined) {
	// 	wavePromise.then(_ => {
		
	// 	})
	// 	.catch(error => {
			
	// 		console.log(error);
	// 	});
	// }
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();
	}
}

// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length - 1;
		load_track(index_no);
		playsong();
	}
}

// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

function range_slider(){
	let position = 0;
        
	// update slider position
	if(!isNaN(track.duration)){
		position = track.currentTime * (100 / track.duration);
		slider.value =  position;

		// Update the current time
        const currentMinutes = Math.floor(track.currentTime / 60);
        const currentSeconds = Math.floor(track.currentTime % 60);
        currentTime.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
	}

	// function will run when the song is over
	if(track.ended){
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		index_no += 1;
		if(index_no === 5){
			index_no = 0;
		}
		load_track(index_no);
		playsong();
	}
}



// Update the Wavesurfer progress when the audio element updates
// track.addEventListener('timeupdate', function () {
// 	wavesurfer.seekTo(track.currentTime / track.duration);
// });

// // Handle play/pause events to sync Wavesurfer state
// track.addEventListener('play', function () {
// 	wavesurfer.play();
// });

// track.addEventListener('pause', function () {
// 	wavesurfer.pause();
// });

// track.addEventListener('ended', function () {
// 	wavesurfer.stop();
// });
