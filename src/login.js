console.log("hello from log in page !!!");

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function () {
  const userInput = document.getElementById("userInput");
  const inputValue = userInput.value;

  const userPin = document.getElementById("userPin");
  const pin = userPin.value;
  if (inputValue == "admin" && pin == "admin123") {
    window.location.assign("./home.html");
  } else {
    alert("plz enter right username and pin");
  }
});

console.log();
