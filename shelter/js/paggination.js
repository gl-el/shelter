import data from './pets.json' assert {type: 'json'};

const PETSREPEAT = 6;
const pagesData = shuffleData(generateData(PETSREPEAT, data));


function getPageSize() {
  let pageSize = 0;
  if (window.screen.width > 1024) {
    pageSize = 8;
  } else if (window.screen.width > 737) {
    pageSize = 6;
  } else {
    pageSize = 3;
  }
  return pageSize;
}

function shuffleArray(srcArr) {
  let shuffledArr = [...srcArr];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
}

function generateData(repeat, src) {
  let genData = [];
  let tempData = shuffleArray(src);
  for (let i = 0; i < repeat; i++) {
    const temp = [...tempData];
    const firstCard = temp.shift();
    temp.push(firstCard);
    tempData = [];
    tempData = [...temp]
    genData.push(temp);
  }
  return genData.flat();
}

function shuffleData(data) {
  const shuffledData = [];
  for (let i = 0; i < data.length; i+=2) {
    const tempArr = [data[i], data[i+1]];
    shuffledData.push(shuffleArray(tempArr));
  }
  return shuffledData.flat();
}

function generatePages() {
  const size = getPageSize();
  const gallery = document.querySelector('.gallery-cards__wrapper');
  for (let i = 0; i < size; i++){
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('layout-column')
    gallery.appendChild(card);
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
generatePages();
function drawCards(j) {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    const title = cards[i].querySelector('.card h6');
    const img = cards[i].querySelector('.card img');

    title.textContent = pagesData[i + j].name;
    img.src = pagesData[i + j].img;
  }
}
drawCards(0)

const btnFirst = document.querySelector('#first');
const btnPrev = document.querySelector('#prev');
const counterDisplay = document.querySelector('.gallery__counter h4');
const btnNext = document.querySelector('#next');
const btnLast = document.querySelector('#last');

btnNext.addEventListener('click', () => {
  const pageSize = getPageSize();
  let counter = +counterDisplay.textContent;
  counter++;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
})

btnPrev.addEventListener('click', () => {
  const pageSize = getPageSize();
  let counter = +counterDisplay.textContent;
  counter--;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
})

btnLast.addEventListener('click', () => {
  const pageSize = getPageSize();
  let counter = pagesData.length / pageSize;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
})

btnFirst.addEventListener('click', () => {
  const pageSize = getPageSize();
  let counter = 1;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
})

function toggleButtons(counter) {
  const pageSize = getPageSize();
  const length = pagesData.length / pageSize;
  if (counter === 1) {
    btnFirst.classList.add('btn-round_inactive');
    btnPrev.classList.add('btn-round_inactive');
    btnNext.classList.remove('btn-round_inactive');
    btnLast.classList.remove('btn-round_inactive');
  }
  if (counter > 1) {
    btnNext.classList.remove('btn-round_inactive');
    btnLast.classList.remove('btn-round_inactive');
    btnPrev.classList.remove('btn-round_inactive');
    btnFirst.classList.remove('btn-round_inactive');
  }
  if (counter === length) {
    btnNext.classList.add('btn-round_inactive');
    btnLast.classList.add('btn-round_inactive');
  }
}




function resize(func) {
  let timer;
  return function (ev) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, ev);
  };
}


window.addEventListener('resize', resize(function (e) {
  const pageSize = getPageSize();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.remove();
  })
  generatePages();
  let counter = 1;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
}));

