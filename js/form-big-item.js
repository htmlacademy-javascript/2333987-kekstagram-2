import {renderItemDetails} from './big-item.js';
import {isEscapeKey, isEnterKey} from './utils.js';

const bodyElement = document.querySelector('body');
const openDialogElement = document.querySelector('.big-picture');
const closeDialogElement = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideFormBigItem();
  }
};

function hideFormBigItem () {
  openDialogElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  const loadMoreButton = document.querySelector('.social__comments-loader');
  if (loadMoreButton) {
    loadMoreButton.classList.remove('hidden');
  }
}

export const showFormBigItem = (item) => {
  openDialogElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderItemDetails(item, openDialogElement);
};

export const initFormBigItem = () => {
  closeDialogElement.addEventListener('click', () => {
    hideFormBigItem();
  });

  closeDialogElement.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      hideFormBigItem();
    }
  });
};
