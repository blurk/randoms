const contents = ["Sinh Nguyen", "A Front-end Developer", "A Desginer"];

let count = 0;
let index = 0;
let currentWord = "";
let letter = "";
let speed = 300;
let isDelete = false;
let wait = speed * 5;
let deleteSpeed = speed / 2;

function type() {
  if (count === contents.length) {
    count = 0;
  }

  currentWord = contents[count];

  letter = !isDelete
    ? currentWord.slice(0, ++index)
    : currentWord.slice(0, --index);

  document.querySelector("#typing").textContent = letter;

  speed = isDelete ? deleteSpeed : speed;

  if (letter.length == currentWord.length) {
    speed = wait;
    isDelete = true;
  }

  if (index === 0) {
    count++;
    isDelete = false;
  }

  setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", type);
