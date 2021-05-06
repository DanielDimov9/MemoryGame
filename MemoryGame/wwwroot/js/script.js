const cards = ["Luigi.jpg", "Luigi.jpg", "Walugi.jpg", "Walugi.jpg", "Toad.jpg", "Toad.jpg", "Yoshi.jpg", "Yoshi.jpg", "Mario.jpg", "Mario.jpg", "Goomba.jpg", "Goomba.jpg"]
const cardsContainer = document.querySelector(".memory-game");

let matchedCards = [];
let currentOpenedCards = [];
let moves = 0;
let time;
let starCount = 3;
let minutes = 0;
let seconds = 0;
  let  timeStart = false;
const modal = document.getElementById("modal");
const timeCounter = document.querySelector(".timer");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const moveCounter = document.querySelector(".moves-counter");
const star = document.getElementById("star-rating").querySelectorAll(".star");


// Shuffle function From http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createBackground() {
    const shuffledDeck = shuffle(cards);
    for (let i = 0; i < shuffledDeck.length; i++) {
        const liTag = document.createElement('LI');
        liTag.classList.add('card')
        const addImage = document.createElement("IMG");
        liTag.appendChild(addImage);
        addImage.setAttribute("src", "img/" + shuffledDeck[i]);
        cardsContainer.appendChild(liTag);
    }
}
createBackground();

function removeCard() {
    while (cardsContainer.hasChildNodes()) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }
}
function timer() {
    time = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timeCounter.innerHTML = "<i class = 'fa fa-hourglass-start'></i>" + "Timer:" + minutes + "Mins" + seconds + "Secs";

    }, 1500);

}
function stopTime() {
    clearInterval(time);
}
function resetEverything() {
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + "Timer:00:00";

    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount = 3;
    movees = 0;
    moveCounter.innerHTML = 0;

    matchedCards = [];
    currentOpenedCards = [];
    removeCard();
    startGame();

}
function movesCounter() {
    moveCounter.innerHTML++;
    moves++;
}
function starRating() {
    if (moves === 12) {
        star[2].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
    if (moves === 15) {
        star[1].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
}

function compareTwo() {
    if (currentOpenedCards.length === 2) {
        document.body.style.pointerEvents = "none";

    }
    if (currentOpenedCards.length === 2 && currentOpenedCards[0].src === currentOpenedCards[1].src) {
        match();
    } else if (currentOpenedCards.length === 2 && currentOpenedCards[0].src != currentOpenedCards[1].src) {
        noMatch();
    }
}

function match() {
    setTimeout(function () {
        currentOpenedCards[0].parentElement.classList.add("match");
        currentOpenedCards[1].parentElement.classList.add("match");
        matchedCards.push(...currentOpenedCards);
        document.body.style.pointerEvents = "auto";
        winGame();
        currentOpenedCards = [];
    }, 600);
    movesCounter();
    starRating();
}
function noMatch() {
    setTimeout(function () {
        currentOpenedCards[0].parentElement.classList.remove("flip");
        currentOpenedCards[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        currentOpenedCards = [];
    }, 700);
    movesCounter();
    starRating();
}
function AddStats() {
    const stats = document.querySelector(".modal-content");
    for (let i = 1; i <= 3; i++) {
        const statsElement = document.createElement("p");
        statsElement.classList.add("stats");
        stats.appendChild(statsElement);
    }
    let p = stats.querySelectorAll("p.stats");
    p[0].innerHTML = "Time to complete:" + minutes + "Minutes and" + seconds + "Seconds";
    p[1].innerHTML = "Moves Taken:" + moves;
    p[2].innerHTML = "Your Star Rating is:" + starCount + "out of 3";
}
function displayModal() {
    const modalClose = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    modalClose.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }

    };
}
function winGame() {
    if (matchedCards.length === 12) {
        stopTime();
        AddStats();
        displayModal();

    }
}
cardsContainer.addEventListener("click", function (evt) {
    if (evt.target.nodeName === "LI") {
        console.log(evt.target.nodeName + "Was clicked");
        if (timeStart === false) {
            timeStart = true;
            timer();
        }
        flipCard();
    }
    function flipCard() {
        evt.target.classList.add("flip");
        addToOpened();
    }
    function addToOpened() {
        if (currentOpenedCards.length === 0 || currentOpenedCards.length === 1) {
            currentOpenedCards.push(evt.target.firstElementChild);
        }
        compareTwo();

    }
});
reset.addEventListener('click', resetEverything);
playAgain.addEventListener('click', function () {
    modal.style.display = "none";
    resetEverything();
});
 
    