// ------------------------------
// INITIAL SETUP
// ------------------------------
const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

// ------------------------------
// POPULATE VOICES
// ------------------------------
function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

window.speechSynthesis.onvoiceschanged = populateVoices;

// ------------------------------
// SET SELECTED VOICE
// ------------------------------
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);

  if (speechSynthesis.speaking) {
    toggle(); // restart speech with new voice
  }
}

// ------------------------------
// HANDLE RATE, PITCH, TEXT CHANGES
// ------------------------------
function setOption() {
  msg[this.name] = this.value;

  if (speechSynthesis.speaking) {
    toggle(); // restart speech to apply updated rate/pitch/text
  }
}

// ------------------------------
// SPEAK FUNCTION
// ------------------------------
function toggle(startOver = true) {
  speechSynthesis.cancel(); // stop current speech

  if (startOver) {
    msg.text = document.querySelector('[name="text"]').value.trim();
    if (!msg.text) return; // prevent empty speech
    speechSynthesis.speak(msg);
  }
}

// ------------------------------
// EVENT LISTENERS
// ------------------------------
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
