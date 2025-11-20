const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const ebtn = document.querySelector("#ebtn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".two select");
const message = document.querySelector("#mes")

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let counteryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${counteryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amval = amount.value;
  console.log(amval);
  if (amount === "" || amval < 1) {
    amval = 1;
    amount.value = 1;
  }
  console.log(fromCurr.value, toCurr.value);

  const from = fromCurr.value.toLowerCase();
  const apiUrl = `${BASE_URL}/${from}.json`;
  let response = await fetch(apiUrl);
  let data = await response.json();

  const to = toCurr.value.toLowerCase();
  let rate = data[from][to];
  console.log(rate);
  let finalAmount = amval * rate;
  console.log("Converted Amount:", finalAmount);
  message.innerText = `${amval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

ebtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate()
});

window.addEventListener("load", () =>{
  updateExchangeRate();
})