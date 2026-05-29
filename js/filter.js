import { debounce } from './utils.js';

const RANDOM_PHOTOS_AMOUNT = 10;
const ACTIVE_FILTER = 'img-filters__button--active';

const filterSectionElement = document.querySelector('.img-filters');


export const filterRandom = (items) => items.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_AMOUNT);
export const sortByMostDiscussed = (items) => items.slice().sort((photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length);
export const showFilter = () => filterSectionElement.classList.remove('img-filters--inactive');

export const changeFilter = (renderGallery, pictures) => {
  const filterFormElement = document.querySelector('.img-filters__form');

  if (!filterFormElement) {
    return;
  }

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
      // комментарий, чтобы не обидеть ESLint
    }
  }, 500);

  filterFormElement.addEventListener('click', (evt) => {

    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    if (evt.target.classList.contains(ACTIVE_FILTER)) {
      return;
    }

    const currentActive = filterFormElement.querySelector(`.${ACTIVE_FILTER}`);
    if (currentActive) {
      currentActive.classList.remove(ACTIVE_FILTER);
    }
    evt.target.classList.add(ACTIVE_FILTER);

    debouncedRenderGallery(evt.target.id);
  });
};

