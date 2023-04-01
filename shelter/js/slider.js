import data from './pets.json' assert {type: 'json'};

function getRandomNumber(max) {
  return Math.floor(Math.random() * max)
}

function generateCards() {
  const slider = document.querySelector('.slider');
  for (let i=0; i<9; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('layout-column')
    slider.appendChild(card);
    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    card.appendChild(cardImg);
    const title = document.createElement('h6');
    card.appendChild(title);
    const btn = document.createElement('button');
    btn.textContent = 'Learn more';
    btn.classList.add('btn');
    btn.classList.add('btn-rounded');
    card.appendChild(btn);
  }
}

let currNumbers = [];
let prevNumbers = [];
let nextNumbers = [];

function shuffleDataIndexes(cardsQuantity) {
  getCurrIndexes(cardsQuantity);
  getPrevIndexes(cardsQuantity);
  getNextIndexes(cardsQuantity);
}

function getCurrIndexes(cardsQuantity) {
  while (currNumbers.length < cardsQuantity / 3) {
    const rNum = getRandomNumber(data.length)
    if (currNumbers.indexOf(rNum) === -1) currNumbers.push(rNum)
  }
}

function getPrevIndexes(cardsQuantity) {
  while (prevNumbers.length < cardsQuantity / 3) {
    const rNum = getRandomNumber(data.length)
    if (currNumbers.indexOf(rNum) === -1 && prevNumbers.indexOf(rNum) === -1) prevNumbers.push(rNum)
  }
}

function getNextIndexes(cardsQuantity) {
  while (nextNumbers.length < cardsQuantity / 3) {
    const rNum = getRandomNumber(data.length)
    if (currNumbers.indexOf(rNum) === -1 && nextNumbers.indexOf(rNum) === -1) nextNumbers.push(rNum)
  }
}



function drawCards() {
  const cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++) {
    const title = cards[i].querySelector('.card h6');
    const img = cards[i].querySelector('.card img');
    if (i < 3) {
      title.textContent = data[prevNumbers[i]].name;
      img.src = data[prevNumbers[i]].img;
    }
    if (i >= 3 && i < 6) {
 
      title.textContent = data[currNumbers[i - 3]].name;
      img.src = data[currNumbers[i - 3]].img;
    }
    if (i >= 6) {

      title.textContent = data[nextNumbers[i-6]].name;
      img.src = data[nextNumbers[i-6]].img;
    }
  }
}

const slider = document.querySelector('.slider');

const sliderNext = document.getElementById('#slider-next');
slider.style.transform = 'translateX(0)';
let direction = '';
sliderNext.addEventListener('click', () => {
  slider.style.transition = 'transform 0.6s';
  slider.style.transform = 'translateX(-33.3%)';
  direction = 'next';
  setTimeout(updateCurrent, 600);
})
const sliderPrev = document.getElementById('#slider-prev');
sliderPrev.addEventListener('click', () => {
  slider.style.transition = 'transform 0.6s';
  slider.style.transform = 'translateX(33.3%)';
  direction = 'prev';
  setTimeout(updateCurrent, 600);
})

function updateCurrent() {
  if (direction === 'prev') {
    const temp = [...prevNumbers];
    nextNumbers = [...currNumbers];
    currNumbers = [...temp];
    prevNumbers = [];
    getPrevIndexes(9);
  }
  if (direction === 'next') {
    const temp = [...nextNumbers];
    prevNumbers = [...currNumbers];
    currNumbers = [...temp];
    nextNumbers = [];
    getNextIndexes(9);
  }
  slider.style.transition = '';
  slider.style.transform = 'translateX(0)';
  drawCards()
}

document.addEventListener('DOMContentLoaded', generateCards(), shuffleDataIndexes(9), drawCards())
