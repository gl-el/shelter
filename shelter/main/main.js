function getJson() {
  const jsonData = '../js/pets.json';
  fetch(jsonData)
    .then(res => res.json())
    .then(data => {
      generateCards();
      shuffleDataIndexes(9, data);
      drawCards(data);
      const slider = document.querySelector('.slider');
      const sliderNext = document.getElementById('#slider-next');
      slider.style.transform = 'translateX(0)';
      let direction = '';
      sliderNext.addEventListener('click', async () => {
        slider.style.transition = 'transform 0.6s';
        slider.style.transform = 'translateX(-33.3%)';
        direction = 'next';
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(updateCurrent(data, slider, direction)), 600);
        })
       await promise;
      })
      const sliderPrev = document.getElementById('#slider-prev');
      sliderPrev.addEventListener('click', async () => {
        slider.style.transition = 'transform 0.6s';
        slider.style.transform = 'translateX(33.3%)';
        direction = 'prev';
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(updateCurrent(data, slider, direction)), 600);
        })
       await promise;
      })

      const cards = document.querySelector('.cards');

      cards.addEventListener('click', (e) => {
        if (e.target.classList[0] === 'card') {
          showModal(e.target, data)
        } else if (e.target.parentNode.classList.value.includes('card')) {
          showModal(e.target.parentNode, data)
        }
      });
    });
}

getJson();