let countDownDate = new Date("Nov 12, 2020 11:00:00").getTime();

let countDown = setInterval(function() {

  let now = new Date().getTime();

  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days+"<small>Days</small>";
  document.getElementById("hours").innerHTML = hours+"<small>Hours</small>";
  document.getElementById("minutes").innerHTML = minutes+"<small>Minutes</small>";
  document.getElementById("seconds").innerHTML = seconds+"<small>Seconds</small>";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("count-down-clock").innerHTML = "\(^o^)/";
  }
}, 1000);

window.onload = countDown;

let chk = document.getElementById('chk');

window.onload = chk.addEventListener('click', () => {
  let className = chk.firstElementChild.className;
  let menu  = document.getElementsByClassName('menu');
  
  if(className == 'fas fa-bars') {
    menu[0].style.top = '-10vh';
    chk.firstElementChild.className = 'fas fa-times';
  } else {
    menu[0].style.top = '-200vh';
    chk.firstElementChild.className = 'fas fa-bars';
  }
});
