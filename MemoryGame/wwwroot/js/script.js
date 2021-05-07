const cards = [
	{
		card: 1,
		img: "img/Bowser.jpg"
	},
	{
		card: 2,
		img: "img/Goomba.jpg"
	},
	{
		card: 3,
		img: "img/Luigi.jpg"
	},
	{
		card: 4,
		img: "img/Mario.jpg"
	},
	{
		card: 5,
		img: "img/Rocket.png"
	},
	{
		card: 6,
		img: "img/Toad.jpg"
	},
	{
		card: 7,

		img: "img/Yoshi.jpg"
	},
	{
		card: 8,
		img: "img/Walugi.jpg"
	},
	{
		card: 9,
		img: "img/Bowser.jpg"
	},
	{
		card: 10,
		img: "img/Goomba.jpg"
	},
	{
		card: 11,
		img: "img/Luigi.jpg"
	},
	{
		card: 12,
		img: "img/Mario.jpg"
	},
	{
		card: 13,
		img: "img/Rocket.png"
	},
	{
		card: 14,
		img: "img/Toad.jpg"
	},
	{
		card: 15,

		img: "img/Yoshi.jpg"
	},
	{
		card: 16,
		img: "img/Walugi.jpg"
	},
];
const cardTop = document.querySelectorAll('.card_top');
const imagesTop = document.querySelectorAll('.image_top');
let gameTimeInterval;
// Basic Functions
function startGame() {
	createBackground();
	startGameTime();
	initializeRestartButton();
}
function restartGame() {
	resetScore();
	createBackground();
	resetGameTime();
	initializeRestartButton();

}
function randomize(a, b) {
	return Math.random() - 0.5;
}
function createBackground() {
	removeAllImages();
	cards.sort(randomize);
	for (let i = 0; i < cards.length; i++) {
		imagesTop[i].setAttribute('src', cards[i].img);
	}
	initializeEventListeners();
}
function removeAllImages() {
	for (let i = 0; i < cards.length; i++) {
		imagesTop[i].setAttribute('src', '');
		imagesTop[i].className = 'image_top';
	}
}
function startGameTime() {
	const gameTime = document.querySelector('.fa-hourglass-start');
	const timeStamp = Date.now();
	clearInterval(gameTimeInterval);
	gameTimeInterval = setInterval(function () {
		let deltaTime = Math.floor((Date.now() - timeStamp) / 1000);
		let seconds = deltaTime % 60 < 10 ? "0" + deltaTime % 60 : deltaTime % 60;
		let minutes = Math.floor(deltaTime / 60) < 10 ? "0" + Math.floor(deltaTime / 60) : Math.floor(deltaTime / 60);
		gameTime.innerText = minutes + " : " + seconds;
	}, 500);
}
function stopGameTime() {
	clearInterval(gameTimeInterval);
}
function resetGameTime() {
	clearInterval(gameTimeInterval);
	startGameTime();
}

function initializeRestartButton() {
	const restartButton = document.querySelector('#restart');
	restartButton.addEventListener('click', restartGame);
}
function playAgainButton() {
	const playAgainButton = document.querySelector('.play_again');
	playAgainButton.addEventListener('click', restartGame);
}
function matchedImages(bool) {
	const selectedImages = document.querySelectorAll('.selected');
	let tempClass = 'match';
	if (!bool) {
		tempClass = 'incorrect';
	}
	selectedImages.forEach(function (element) {
		return element.className = tempClass;
	});
	flipIncorrectImages();
}
function flipIncorrectImages() {
	const selectedIncorrect = document.querySelectorAll('.incorrect');
	setTimeout(function () {
		return selectedIncorrect.forEach(function (element) {
			return element.className = 'image_top';
		});
	}, 1000);
}
function resetScore() {
	removeAllImages();
	;
	const stars = document.querySelectorAll('.fa-star');
	for (let i = 0; i < 3; i++) {
		stars[i].style.color = '#fbca39';
	}
	const winningStars = document.querySelectorAll('.winning_stars .fa-star');
	for (let i = 0; i < 3; i++) {
		winningStars[i].style.color = '#fbca39';
	}
	document.querySelector('.winner_message').classList.remove('active');
	document.querySelector('.paragraph_moves').innerText = 'Moves: 0';
	clickCounter = 0;
}
function updateScore(clickCounter) {
	const stars = document.querySelectorAll('.stars .fa-star');
	const winningStars = document.querySelectorAll('.winning_stars .fa-star');
	switch (clickCounter) {
		case 10:
			stars[0].style.color = '#fbca39';
			stars[1].style.color = '#fbca39';
			stars[2].style.color = '#7a6427';
			winningStars[0].style.color = '#fbca39';
			winningStars[1].style.color = '#fbca39';
			winningStars[2].style.color = '#fde9ac';
			break;
		case 20:
			stars[0].style.color = '#fbca39';
			stars[1].style.color = '#7a6427';
			stars[2].style.color = '#7a6427';
			winningStars[0].style.color = '#fbca39';
			winningStars[1].style.color = '#fde9ac';
			winningStars[2].style.color = '#fde9ac';
	}
}
function checkGameOver() {
	const allImages = document.querySelectorAll('.card_top img').length;
	const matchImages = document.querySelectorAll('.match').length;
	if (matchImages === allImages) {
		displayWinningMessage();
	}
}
function displayWinningMessage() {
	document.querySelector('.winner_message').classList.add('active');
	stopGameTime();
	winningMessage();
}

function winningMessage() {
	const finalGameTime = document.querySelector('.final_time');
	finalGameTime.innerText = "Time " + document.querySelector('.paragraph_timer').innerText;
	playAgainButton();
}

function initializeEventListeners() {
	const imagesTop = document.querySelectorAll('.image_top');
	let selectedImages = [];
	for (let i = 0; i < imagesTop.length; i++) {
		imagesTop[i].addEventListener('click', function (evt) {
			if (imagesTop[i].className === 'image_top') {
				imagesTop[i].className = 'selected';
				selectedImages.push(imagesTop[i]);
				if (selectedImages.length === 2) {
					selectedImages[0].src === selectedImages[1].src ? matchedImages(true) : matchedImages(false);
					selectedImages = [];
					clickCounter += 1;
					updateScore(clickCounter);
					document.querySelector('.paragraph_moves').innerText = 'Moves: ' + clickCounter;
					document.querySelector('.final_moves').innerText = 'Moves: ' + clickCounter;
				}
				checkGameOver();
			}
		});
	}
}
restartGame()
startGame();
 
    