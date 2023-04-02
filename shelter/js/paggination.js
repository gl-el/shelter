import data from './pets.json' assert {type: 'json'};

let pagesData = [];
const PETSREPEAT = 6;
let pageSize;


function getPageSize() {
  if (window.screen.width > 768) {
    pageSize = 8;
  } else if (window.screen.width > 737) {
    pageSize = 6;
  } else {
    pageSize = 3;
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function generatePages() {
  const temp = [];
  for (let i = 0; i < PETSREPEAT; i++) {
    const tempData = [...data];
    shuffleArray(tempData);
    temp.push(...tempData);
  }

  for (let i = 0; i <= (data.length * PETSREPEAT) / pageSize; i++) {
    const pageData = [];
    for (let i = 0; i < temp.length; i++) {
      if (pageData.length === pageSize) { break; }
      if (pageData.indexOf(temp[i]) === -1) { pageData.push(temp[i]) }
    }
    pageData.forEach((item) => { temp.splice(temp.indexOf(item), 1) })
    pagesData.push(...pageData);
  }
  console.log(pagesData)
}

function drawCards(j) {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < pageSize; i++) {
    const title = cards[i].querySelector('.card h6');
    const img = cards[i].querySelector('.card img');

    title.textContent = pagesData[i + j].name;
    img.src = pagesData[i + j].img;
  }
}

const btnFirst = document.querySelector('#first');
const btnPrev = document.querySelector('#prev');
const counterDisplay = document.querySelector('.gallery__counter h4');
const btnNext = document.querySelector('#next');
const btnLast = document.querySelector('#last');

btnNext.addEventListener('click', () => {
  let counter = +counterDisplay.textContent;
  counter++;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
})

btnPrev.addEventListener('click', () => {
  let counter = +counterDisplay.textContent;
  counter--;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
})

btnLast.addEventListener('click', () => {
  let counter = pagesData.length / pageSize;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
})

btnFirst.addEventListener('click', () => {
  let counter = 1;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
})

function toggleButtons(counter) {
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


document.addEventListener('DOMContentLoaded', getPageSize(), generatePages(), drawCards(0));

function resize(func) {
  let timer;
  return function (ev) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, ev);
  };
}


window.addEventListener('resize', resize(function (e) {
  pagesData = [];
  getPageSize();
  generatePages();
  let counter = 1;
  toggleButtons(counter);
  drawCards(pageSize * (counter - 1));
  counterDisplay.textContent = counter;
}));
