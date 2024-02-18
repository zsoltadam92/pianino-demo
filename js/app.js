const keys = [
  { note: 'a', color: 'white' },
  { note: 'w', color: 'black' },
  { note: 's', color: 'white' },
  { note: 'e', color: 'black' },
  { note: 'd', color: 'white' },
  { note: 'f', color: 'white' },
  { note: 't', color: 'black' },
  { note: 'g', color: 'white' },
  { note: 'z', color: 'black' },
  { note: 'h', color: 'white' },
  { note: 'u', color: 'black' },
  { note: 'j', color: 'white' },
  { note: 'k', color: 'white' },
  { note: 'o', color: 'black' },
  { note: 'l', color: 'white' },
  { note: 'p', color: 'black' },
  { note: 'é', color: 'white' },
  { note: 'y', color: 'white' },
  { note: 'x', color: 'black' },
  { note: 'c', color: 'white' },
  { note: 'v', color: 'black' },
  { note: 'b', color: 'white' },
  { note: 'n', color: 'black' },
  { note: 'm', color: 'white' },
];

const volumeSlider = document.querySelector("#customRange1")
const switchKeysChars = document.querySelector("#flexSwitchCheckChecked")
let audioFiles = {}
let currentVolume = 0.5;

const preloadAudioFiles = () => {
  keys.forEach(key => {
    const audio = new Audio(`sounds/${key.note}.ogg`)
    audio.load() // Explicitly call load to start preloading
    audioFiles[key.note] = audio// Store the loaded audio object
  })
}

const renderPiano = () => {
  const pianoKeys = document.querySelector("#pianoKeys")
  const ul = document.createElement("ul")
  ul.className = "d-flex list-unstyled mt-3"

  keys.forEach(key => {
    const li = document.createElement("li")
    li.className = `key ${key.color}`
    li.setAttribute("data-key", key.note)
    li.innerHTML = `<span>${key.note}</span>`
    li.addEventListener('click', () => playAudio(key.note));

    ul.appendChild(li) 
  })

  pianoKeys.appendChild(ul)
}


const playAudio = (note) => {
  
  const audio = audioFiles[note]; // Retrieve pre-loaded audio
  if (audio) {
    audio.currentTime = 0; // Reset the audio playback to the start
    audio.volume = currentVolume
    audio.play();
  
    const keyElement = document.querySelector(`.key[data-key="${note}"]`);
    if (keyElement) {
      keyElement.classList.add("active"); 
  
      setTimeout(() => {
        keyElement.classList.remove("active");
      }, 250);
    }
  }
}

document.addEventListener('keydown',  (event) => {
  // Ensure we play the note only if it's pre-loaded
  if (audioFiles[event.key]) {
    playAudio(event.key);
  }
});


const handleVolume = (event) => {
  currentVolume = event.target.value
}

volumeSlider.addEventListener("input", handleVolume)


const handleSwitch = () => {
  document.querySelectorAll(".key").forEach((key) => key.classList.toggle("hide"));
}

switchKeysChars.addEventListener("click", handleSwitch) 

// Call preloadAudioFiles during page initialization or when the piano component is mounted
document.addEventListener("DOMContentLoaded", () => {
  preloadAudioFiles(); // Pre-load audio files
  renderPiano(); // Render the piano keys
});


let startDistance = null;
let scale = 1;

const zoomableElement = document.getElementById('zoomableElement');

// Function to calculate distance between two touch points
function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) +
                  Math.pow(touches[0].pageY - touches[1].pageY, 2));
}

// Touchstart event to initialize the startDistance
zoomableElement.addEventListener('touchstart', function(e) {
  if (e.touches.length === 2) { // Ensure two fingers are used
    startDistance = getDistance(e.touches);
    e.preventDefault(); // Prevent page scrolling
  }
}, { passive: false });

// Touchmove event to adjust scale based on finger movement
zoomableElement.addEventListener('touchmove', function(e) {
  if (e.touches.length === 2) {
    const currentDistance = getDistance(e.touches);
    if (startDistance) {
      // Calculate the scale factor and adjust the element's scale
      let scaleFactor = currentDistance / startDistance;
      scale *= scaleFactor;
      zoomableElement.style.transform = `scale(${scale})`;
      // Reset startDistance for the next move event
      startDistance = currentDistance;
    }
    e.preventDefault(); // Prevent page scrolling
  }
}, { passive: false });