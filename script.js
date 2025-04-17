const board = document.getElementById("board");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const newGameBtn = document.getElementById("new-game");
const congratsMessage = document.getElementById("congrats");
const popupModal = document.getElementById("popup-modal");
const playAgainBtn = document.getElementById("play-again");

let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let matched = 0;
let timer;
let seconds = 0;

const icons = [
  "🍎", "🚀", "🐶", "🎵", "🌈", "🍩", "⚽", "🚗", "🎮", "🧊",
  "🎈", "🐠", "🦄", "🌻", "🍔", "🎂", "🎧", "📚"
];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function startGame() {
  board.innerHTML = "";
  congratsMessage.classList.add("hidden");
  popupModal.classList.add("hidden");
  moves = 0;
  matched = 0;
  seconds = 0;
  clearInterval(timer);
  movesCounter.textContent = `Moves: ${moves}`;
  timerDisplay.textContent = `Time: 0s`;

  const pairIcons = shuffle([...icons, ...icons]);
  const selected = pairIcons.slice(0, 18);
  const cards = shuffle([...selected, ...selected]);

  cards.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${icon}</div>
      </div>
    `;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });

  timer = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Time: ${seconds}s`;
  }, 1000);
}

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  moves++;
  movesCounter.textContent = `Moves: ${moves}`;

  const firstIcon = firstCard.querySelector(".card-back").textContent;
  const secondIcon = secondCard.querySelector(".card-back").textContent;

  if (firstIcon === secondIcon) {
    matched++;
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
    if (matched === 18) {
      clearInterval(timer);
      setTimeout(() => {
        popupModal.classList.remove("hidden");
      }, 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
    }, 1000);
  }
}

newGameBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
window.addEventListener("load", startGame);
