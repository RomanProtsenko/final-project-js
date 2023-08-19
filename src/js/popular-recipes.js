import { FetchInfo } from './fetch-requests';

const popularRecipes = new FetchInfo();
const popularListEl = document.querySelector('.popular-list-js');

async function getPopular() {
  try {
    const resp = await popularRecipes.fetchPopularRecipes();
    popularListEl.insertAdjacentHTML(
      'afterbegin',
      createPopularMarkUp(resp.data)
    );
  } catch (err) {
    console.log(err);
    popularListEl.innerHTML = `
                  <p class="popular-err">
                  We are sorry, something went wrong. Please, reload the page!
                  </p>
                  `;
  }
}

getPopular();

function createPopularMarkUp(arr) {
  if (seeViewportForPopular() === 2) {
    arr.splice(0, 2);
  }

  return arr
    .map(({ title, description, preview, _id }) => {
      title = seeViewportForTitle(title);

      const numberOfLetters = seeViewportForDescription();

      let newDescription;
      if (description.length > numberOfLetters) {
        newDescription = description.slice(0, numberOfLetters);
        description = newDescription + '...';
      }

      const descriptionString = `
            <li class="popular-recipe" id="${_id}">
            <img class="popular-img" src="${preview}" alt="${title}">
            <div class="popular-desc-container">
            <h3 class="popular-recipe-title">${title}</h3>
            <p class="popular-recipe-descr">${description}</p>
            </div>
            </li>
            `;
      return descriptionString;
    })
    .join('');
}

function seeViewportForPopular() {
  let number = '2';
  const smallMedia = window.matchMedia('(max-width: 768px)');
  const largeMedia = window.matchMedia('(max-width: 1200px)');
  smallMedia.addEventListener('change', isPhone);
  largeMedia.addEventListener('change', isTablet);
  isPhone(smallMedia);

  function isPhone(event) {
    if (event.matches) {
      number = 2;
    } else {
      isTablet(largeMedia);
    }
  }

  function isTablet(event) {
    if (event.matches) {
      number = 4;
    } else {
      number = 4;
    }
  }
  return number;
}

function seeViewportForTitle(title) {
  let string = title;
  const smallMedia = window.matchMedia('(max-width: 768px)');
  const largeMedia = window.matchMedia('(max-width: 1200px)');
  smallMedia.addEventListener('change', isPhone);
  largeMedia.addEventListener('change', isTablet);
  isPhone(smallMedia);

  function isPhone(event) {
    if (event.matches) {
      string = title;
    } else {
      isTablet(largeMedia);
    }
  }

  function isTablet(event) {
    if (event.matches) {
      if (string.length > 11) {
        const newTitle = string.slice(0, 11);
        string = newTitle + '...';
      }
    } else {
      string = title;
    }
  }
  return string;
}

function seeViewportForDescription() {
  let number = '80';
  const smallMedia = window.matchMedia('(max-width: 768px)');
  const largeMedia = window.matchMedia('(max-width: 1200px)');
  smallMedia.addEventListener('change', isPhone);
  largeMedia.addEventListener('change', isTablet);
  isPhone(smallMedia);

  function isPhone(event) {
    if (event.matches) {
      number = 80;
    } else {
      isTablet(largeMedia);
    }
  }

  function isTablet(event) {
    if (event.matches) {
      number = 43;
    } else {
      number = 80;
    }
  }
  return number;
}
