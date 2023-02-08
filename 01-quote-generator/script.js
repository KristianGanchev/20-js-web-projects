const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://icanhazdadjoke.com";
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      }
    });
    const data = await response.json();
    authorText.innerText = data.id;

    if (data.joke.length > 100) {
      quoteText.classList.add("long-quote")
    } else {
      quoteText.classList.remove("long-quote")
    }
    quoteText.innerText = data.joke;
    removeLoadingSpinner();
  } catch (error) {
    console.log("whoops, no quote", error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank")
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();