const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

const toggleButton = () => {
  button.disabled = !button.disabled;
};

const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "API_KEY",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

const getJokes = async () => {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log(error);
  }
};

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);