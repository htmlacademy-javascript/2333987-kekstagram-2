const COMMENT_COUNT = 5;
const AVATAR_SIZE = 35;

const commentListElement = document.querySelector('.social__comments');
const counterRenderedCommentsElement = document.querySelector('.social__comment-shown-count')
  || document.querySelector('.comments-current');

let currentLoadMoreHandler = null;

const showLoadMoreButton = () => {
  const currentButton = document.querySelector('.social__comments-loader');
  if (currentButton) {
    currentButton.classList.remove('hidden');
  }
};

const hideLoadMoreButton = () => {
  const currentButton = document.querySelector('.social__comments-loader');
  if (currentButton) {
    currentButton.classList.add('hidden');
  }
};

const createComment = (comment) => {
  const {avatar, name, message} = comment;

  const commentLiElement = document.createElement('li');
  commentLiElement.classList.add('social__comment');

  const commentImageElement = document.createElement('img');
  commentImageElement.classList.add('social__picture');
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  commentImageElement.width = AVATAR_SIZE;
  commentImageElement.height = AVATAR_SIZE;

  const commentParagraphElement = document.createElement('p');
  commentParagraphElement.classList.add('social__text');
  commentParagraphElement.textContent = message;

  commentLiElement.append(commentImageElement);
  commentLiElement.append(commentParagraphElement);

  return commentLiElement;
};

const addComment = (comment) => {
  commentListElement.append(createComment(comment));
};

const calcCounterLoadedComments = (marker, length) => marker > length ? length : marker;

const onLoadMoreButtonClick = (items) => (evt) => {
  evt.preventDefault();

  let marker = commentListElement.childNodes.length;
  items.slice(marker, marker + COMMENT_COUNT).forEach((comment) => {
    addComment(comment);
  });
  marker += COMMENT_COUNT;

  if (counterRenderedCommentsElement) {
    counterRenderedCommentsElement.textContent = calcCounterLoadedComments(marker, items.length);
  }

  if (marker >= items.length) {
    hideLoadMoreButton();
  }
};

const renderVisibleComments = (comments) => {
  comments.forEach((comment) => {
    addComment(comment);
  });
  hideLoadMoreButton();
  if (counterRenderedCommentsElement) {
    counterRenderedCommentsElement.textContent = comments.length;
  }
};

const renderInvisibleComments = (comments) => {
  comments.slice(0, COMMENT_COUNT).forEach((comment) => {
    addComment(comment);
  });

  if (counterRenderedCommentsElement) {
    counterRenderedCommentsElement.textContent = calcCounterLoadedComments(commentListElement.childNodes.length, comments.length);
  }

  const originalButton = document.querySelector('.social__comments-loader');
  if (originalButton) {
    originalButton.classList.add('comments-loader');
  }

  showLoadMoreButton();

  if (originalButton && currentLoadMoreHandler) {
    originalButton.removeEventListener('click', currentLoadMoreHandler);
  }

  currentLoadMoreHandler = onLoadMoreButtonClick(comments);

  if (originalButton) {
    originalButton.addEventListener('click', currentLoadMoreHandler);
  }
};

const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  const originalButton = document.querySelector('.social__comments-loader');
  if (originalButton && currentLoadMoreHandler) {
    originalButton.removeEventListener('click', currentLoadMoreHandler);
  }

  if (comments.length <= COMMENT_COUNT) {
    renderVisibleComments(comments);
  } else {
    renderInvisibleComments(comments);
  }
};

export const renderItemDetails = (item, outputContainer) => {
  const {comments, description, likes, url} = item;

  const bigImage = outputContainer.querySelector('.big-picture__img img');
  if (bigImage) {
    bigImage.src = url;
    bigImage.alt = description;
  }

  const captionElement = outputContainer.querySelector('.social__caption');
  if (captionElement) {
    captionElement.textContent = description;
  }

  const likesElement = outputContainer.querySelector('.likes-count');
  if (likesElement) {
    likesElement.textContent = likes;
  }

  const totalCountElement = outputContainer.querySelector('.social__comment-total-count')
    || outputContainer.querySelector('.comments-count');
  if (totalCountElement) {
    totalCountElement.textContent = comments.length;
  }

  const shownCountElement = outputContainer.querySelector('.social__comment-shown-count');
  if (shownCountElement) {
    shownCountElement.textContent = Math.min(5, comments.length);
  }

  const anyLoadMoreButton = outputContainer.querySelector('.social__comments-loader')
    || outputContainer.querySelector('.comments-loader');

  if (anyLoadMoreButton) {

    anyLoadMoreButton.classList.add('social__comments-loader', 'comments-loader');
  }

  renderComments(comments);
};
