document.addEventListener('DOMContentLoaded', () => {
	//COUNT DOWN
	let countDownDate = new Date('Nov 12, 2021 11:00:00').getTime();

	let countDown = setInterval(function () {
		let now = new Date().getTime();

		let distance = countDownDate - now;

		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById('days').innerHTML = days + '<small>Days</small>';
		document.getElementById('hours').innerHTML = hours + '<small>Hours</small>';
		document.getElementById('minutes').innerHTML =
			minutes + '<small>Minutes</small>';
		document.getElementById('seconds').innerHTML =
			seconds + '<small>Seconds</small>';

		if (distance < 0) {
			clearInterval(x);
			document.getElementById('count-down-clock').innerHTML = '(^o^)/';
		}
	}, 1000);

	let chk = document.getElementById('chk');

	chk.addEventListener('click', () => {
		let className = chk.firstElementChild.className;
		let menu = document.getElementsByClassName('menu');

		if (className == 'fas fa-bars') {
			menu[0].style.top = '-10vh';
			chk.firstElementChild.className = 'fas fa-times';
		} else {
			menu[0].style.top = '-200vh';
			chk.firstElementChild.className = 'fas fa-bars';
		}
	});
});

//MODAL
let modal = document.getElementById('inviteModal');

let btn = document.getElementById('invite');

let span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
	modal.style.display = 'block';
};

span.onclick = function () {
	modal.style.display = 'none';
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

//SCROLL TO TOP

let toTopBtn = document.getElementById('btnToTop');
toTopBtn.addEventListener('click', () => {
	window.scrollTo(0, 0);
});

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		toTopBtn.style.visibility = 'visible';
	} else {
		toTopBtn.style.visibility = 'hidden';
	}
}

// ANIMATE ON SCROLL

const sliderItems = document.querySelectorAll('.slide-in');

function checkSlide() {
	sliderItems.forEach((sliderItem) => {
		// half way through the item
		const slideInAt =
			window.scrollY + window.innerHeight - sliderItem.height / 2;
		// bottom of the item
		const itemBottom = sliderItem.offsetTop + sliderItem.height;
		const isHalfShown = slideInAt > sliderItem.offsetTop;
		const isNotScrolledPast = window.scrollY < itemBottom;
		if (isHalfShown && isNotScrolledPast) {
			sliderItem.classList.add('active');
		}
	});
}

window.addEventListener('scroll', _.throttle(checkSlide, 100));
