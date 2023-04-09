/*import data from './pets.json' assert {type: 'json'};*/

function getRandomNumber(max) {
  return Math.floor(Math.random() * max)
}

function generateCards() {
  const slider = document.querySelector('.slider');
  for (let i = 0; i < 9; i++) {
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

function shuffleDataIndexes(cardsQuantity, data) {
  getCurrIndexes(cardsQuantity, data);
  getPrevIndexes(cardsQuantity, data);
  getNextIndexes(cardsQuantity, data);
}

function getCurrIndexes(cardsQuantity, data) {
  while (currNumbers.length < cardsQuantity / 3) {
    const rNum = getRandomNumber(data.length)
    if (currNumbers.indexOf(rNum) === -1) currNumbers.push(rNum)
  }
}

function getPrevIndexes(cardsQuantity, data) {
  while (prevNumbers.length < cardsQuantity / 3) {
    const rNum = getRandomNumber(data.length)
    if (currNumbers.indexOf(rNum) === -1 && prevNumbers.indexOf(rNum) === -1) prevNumbers.push(rNum)
  }
}

function getNextIndexes(cardsQuantity, data) {
  while (nextNumbers.length < cardsQuantity / 3) {
    const rNum = getRandomNumber(data.length)
    if (currNumbers.indexOf(rNum) === -1 && nextNumbers.indexOf(rNum) === -1) nextNumbers.push(rNum)
  }
}



function drawCards(data) {
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

      title.textContent = data[nextNumbers[i - 6]].name;
      img.src = data[nextNumbers[i - 6]].img;
    }
  }
}

function slideNext(data) {
  
}

function updateCurrent(data, element, direction) {
  if (direction === 'prev') {
    const temp = [...prevNumbers];
    nextNumbers = [...currNumbers];
    currNumbers = [...temp];
    prevNumbers = [];
    getPrevIndexes(9, data);
  }
  if (direction === 'next') {
    const temp = [...nextNumbers];
    prevNumbers = [...currNumbers];
    currNumbers = [...temp];
    nextNumbers = [];
    getNextIndexes(9, data);
  }
  element.style.transition = '';
  element.style.transform = 'translateX(0)';
  drawCards(data)
}

