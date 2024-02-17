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
let currentVolume = 0.5;

const renderPiano = () => {
  const pianoKeys = document.querySelector("#pianoKeys")
  const ul = document.createElement("ul")
  ul.className = "d-flex list-unstyled mt-3"

  keys.forEach(key => {
    const li = document.createElement("li")
    li.className = `key ${key.color}`
    li.setAttribute("data-key", key.note)
    li.innerHTML = `<span>${key.note}</span>`
    li.addEventListener('click', () => playAudioByClick(key.note));

    ul.appendChild(li) 
  })

  pianoKeys.appendChild(ul)
}


const playAudioByKeyBoard = (event) => {
  const keyElement = document.querySelector(`.key[data-key="${event.key}"]`);
  
  if (keyElement) {
    const audio = new Audio(`sounds/${event.key}.ogg`);
    audio.volume = currentVolume
    audio.play();
    keyElement.classList.add("active"); 

    setTimeout(() => {
      keyElement.classList.remove("active");
    }, 250);
  }
}
const playAudioByClick = (note) => {
  const keyElement = document.querySelector(`.key[data-key="${note}"]`);
  
  if (keyElement) {
    const audio = new Audio(`sounds/${note}.ogg`);
    audio.volume = currentVolume
    audio.play();
    keyElement.classList.add("active"); 

    setTimeout(() => {
      keyElement.classList.remove("active");
    }, 250);
  }
}

document.addEventListener('keydown', playAudioByKeyBoard);


const handleVolume = (event) => {
  currentVolume = event.target.value
}

volumeSlider.addEventListener("input", handleVolume)


const handleSwitch = () => {
  document.querySelectorAll(".key").forEach((key) => key.classList.toggle("hide"));
}

switchKeysChars.addEventListener("click", handleSwitch) 

document.addEventListener("DOMContentLoaded", renderPiano)