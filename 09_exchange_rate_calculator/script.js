const currencyElOne = document.getElementById("currency-one");
const amountElOne = document.getElementById("amount-one");
const currencyElTwo = document.getElementById("currency-two");
const amountElTwo = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

const calculate = async () => {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;

  const response = await fetch(
    `https://open.exchangerate-api.com/v6/latest/${currencyOne}`
  );
  const data = await response.json();
  const rate = data.rates[currencyTwo];

  rateEl.innerText = `${currencyOne} = ${rate} ${currencyTwo}`;

  amountElTwo.value = (amountElOne.value * rate).toFixed(2);
};

currencyElOne.addEventListener("change", calculate);
amountElOne.addEventListener("input", calculate);
currencyElTwo.addEventListener("change", calculate);
amountElTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;

  calculate();
});

calculate();
