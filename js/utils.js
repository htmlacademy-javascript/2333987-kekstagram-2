const ALERT_SHOW_TIME = 5000;

const alertStyles = {
  zIndex : '100',
  position : 'absolute',
  left : '0',
  top : '0',
  right : '0',
  padding : '10px 3px',
  fontSize : '30px',
  lineHeight : '36px',
  textAlign : 'center',
  backgroundColor : '#232321',
  color: '#ffffff',
};

export const checkLength = (array, maxLength) => array.length <= maxLength;

export const checkRepeats = (array) => {
  const itemsInUpperCase = array.map((item) => item.toUpperCase());
  const arrayNoRepeats = new Set(itemsInUpperCase);
  return arrayNoRepeats.size === itemsInUpperCase.length;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const isEnterKey = (evt) => evt.key === 'Enter';

export const removeLastCharacter = (string) => string ? string.slice(0, -1) : string;

export const showAlert = (message) => {
  const alertContainerElement = document.createElement('div');
  Object.assign(alertContainerElement.style, alertStyles);
  alertContainerElement.textContent = message;
  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
