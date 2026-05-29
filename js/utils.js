const ALERT_SHOW_TIME = 5000;

export const checkLength = (array, maxLength) => array.length <= maxLength;

export const checkRepeats = (array) => {
  const itemsInUpperCase = array.map((item) => item.toUpperCase());
  const arrayNoRepeats = new Set(itemsInUpperCase);
  return arrayNoRepeats.size === itemsInUpperCase.length;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const isEnterKey = (evt) => evt.key === 'Enter';

export const removeLastCharacter = (string) => string ? string.slice(0, -1) : string;

export const showAlert = () => {

  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

  const errorElement = errorTemplate.cloneNode(true);

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};


export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};
