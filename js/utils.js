const ALERT_SHOW_TIME = 5000;

export const checkLength = (hashtags, maxLength) => hashtags.length <= maxLength;

export const checkRepeats = (hashtags) => {
  const itemsInUpperCase = hashtags.map((item) => item.toUpperCase());
  const hashtagsNoRepeats = new Set(itemsInUpperCase);
  return hashtagsNoRepeats.size === itemsInUpperCase.length;
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
