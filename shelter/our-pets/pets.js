function getJson() {
  const jsonData = '../js/pets.json';
  fetch(jsonData)
    .then(res => res.json())
    .then(data => {
      const cards = document.querySelector('.cards');

      cards.addEventListener('click', (e) => {
        if (e.target.classList[0] === 'card') {
          showModal(e.target, data)
        } else if (e.target.parentNode.classList.value.includes('card')) {
          showModal(e.target.parentNode, data)
        }
      });


      const PETSREPEAT = 6;
      const pagesData = shuffleData(generateData(PETSREPEAT, data));
      generatePages();
      drawCards(0, pagesData);
      const btnFirst = document.querySelector('#first');
      const btnPrev = document.querySelector('#prev');
      const counterDisplay = document.querySelector('.gallery__counter h4');
      const btnNext = document.querySelector('#next');
      const btnLast = document.querySelector('#last');

      btnNext.addEventListener('click', () => {
        const pageSize = getPageSize();
        let counter = +counterDisplay.textContent;
        counter++;
        toggleButtons(counter, pagesData);
        drawCards(pageSize * (counter - 1), pagesData);
        counterDisplay.textContent = counter;
      })

      btnPrev.addEventListener('click', () => {
        const pageSize = getPageSize();
        let counter = +counterDisplay.textContent;
        counter--;
        toggleButtons(counter, pagesData);
        drawCards(pageSize * (counter - 1), pagesData);
        counterDisplay.textContent = counter;
      })

      btnLast.addEventListener('click', () => {
        const pageSize = getPageSize();
        let counter = pagesData.length / pageSize;
        toggleButtons(counter, pagesData);
        drawCards(pageSize * (counter - 1), pagesData);
        counterDisplay.textContent = counter;
      })

      btnFirst.addEventListener('click', () => {
        const pageSize = getPageSize();
        let counter = 1;
        toggleButtons(counter, pagesData);
        drawCards(pageSize * (counter - 1), pagesData);
        counterDisplay.textContent = counter;
      })
      
      let width = window.screen.width;
      window.addEventListener('resize', resize(function (e) {
        if (window.screen.width != width) {
          const pageSize = getPageSize();
          const cards = document.querySelectorAll('.card');
          cards.forEach(card => {
            card.remove();
          })
          generatePages();
          let counter = 1;
          toggleButtons(counter, pagesData);
          drawCards(pageSize * (counter - 1), pagesData);
          counterDisplay.textContent = counter;
        }
      }));
    });
}

getJson();