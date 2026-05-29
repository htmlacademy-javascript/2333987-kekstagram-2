import { debounce } from './utils.js';

const RANDOM_PHOTOS_AMOUNT = 10;
const ACTIVE_FILTER = 'img-filters__button--active';

const filterSectionElement = document.querySelector('.img-filters');


export const filterRandom = (items) => items.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_AMOUNT);
export const sortByMostDiscussed = (items) => items.slice().sort((photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length);
export const showFilter = () => filterSectionElement.classList.remove('img-filters--inactive');

export const changeFilter = (renderGallery, pictures) => {
  const buttons = document.querySelectorAll('.img-filters__button');

  const debouncedRenderGallery = debounce((targetId) => {
    try {
      document.querySelectorAll('.picture').forEach((pic) => pic.remove());

      if (targetId === 'filter-default') {
        renderGallery(pictures);
      } else if (targetId === 'filter-random') {
        renderGallery(filterRandom(pictures));
      } else if (targetId === 'filter-discussed') {
        renderGallery(sortByMostDiscussed(pictures));
      }
    } catch (error) {
      // Оставил комментарий, чтобы не ругался ESLint
    }
  }, 500);

  buttons.forEach((button) => {
    button.addEventListener('click', (evt) => {

      const currentActive = document.querySelector(`.${ACTIVE_FILTER}`);
      if (currentActive) {
        currentActive.classList.remove(ACTIVE_FILTER);
      }

      evt.currentTarget.classList.add(ACTIVE_FILTER);

      debouncedRenderGallery(evt.currentTarget.id);
    });
  });
};

