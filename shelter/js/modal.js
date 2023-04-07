import data from '../js/pets.json' assert {type: 'json'};

const cards = document.querySelector('.cards');
const body = document.querySelector('.body');

cards.addEventListener('click', (e) => {
if (e.target.classList[0] === 'card') {
  showModal(e.target)
} else if (e.target.parentNode.classList.value.includes('card')) {
  showModal(e.target.parentNode)
} 
});

function showModal(card) {
  const name = card.querySelector('h6').textContent;
  const cardData = data.find(item => item.name === name);
  createCard(cardData);
  const restPage = document.querySelector('.modal__bg');
  restPage.addEventListener('click', (e) => {
    if (e.target.className === 'modal__bg' || e.target.className === 'btn btn-round'|| e.target.className === 'ico-close') {
      restPage.remove();
      body.classList.remove('body_hidden');
    }
  });
}

function createCard(data) {
  const background = document.createElement('div');
  background.className = 'modal__bg';
  body.appendChild(background);
  body.classList.add('body_hidden');
  const modal = document.createElement('div');
  modal.className = 'modal';
  background.appendChild(modal);

  const img = document.createElement('img');
  img.src = data.img;
  img.alt = data.breed;
  modal.appendChild(img);

  const content = document.createElement('div');
  content.className = 'modal__content';
  modal.appendChild(content);

  const titleContainer = document.createElement('div');
  titleContainer.className = 'title__container';
  content.appendChild(titleContainer);

  const title = document.createElement('h3');
  title.textContent = data.name;
  titleContainer.appendChild(title);

  const subtitle = document.createElement('h4');
  subtitle.textContent = data.type + ' - ' + data.breed;
  titleContainer.appendChild(subtitle);

  const descr = document.createElement('h5');
  descr.textContent = data.description;
  content.appendChild(descr);

  const list = document.createElement('ul');
  content.appendChild(list);

  const listItemAge = document.createElement('li');
  const listItemAgeDescr = document.createElement('span');
  listItemAge.textContent = 'Age: ';
  listItemAgeDescr.textContent = data.age;
  listItemAge.appendChild(listItemAgeDescr);
  list.appendChild(listItemAge);

  for (let key in data.medical) {
    const listItem = document.createElement('li');
    const listItemDescr = document.createElement('span');
    listItem.textContent = `${key}:`;
    (data.medical[key].length > 1) ? listItemDescr.textContent = `\u0020` + data.medical[key].join(', ') : listItemDescr.textContent = `\u0020` + data.medical[key];
    listItem.appendChild(listItemDescr);
    list.appendChild(listItem);
  }

  const btn = document.createElement('button');
  btn.className = 'btn btn-round';

  const btnIco = document.createElement('img');
  btnIco.src = '../assets/icons/close.svg';
  btnIco.alt = 'close';
  btnIco.className = 'ico-close';

  btn.appendChild(btnIco);
  modal.appendChild(btn);

}

