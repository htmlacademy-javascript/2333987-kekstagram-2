import {getData} from './api.js';
import {initGallery} from './gallery.js';
import {hideFormUpload, initFormUpload} from './form-upload.js';
import {debounce, showAlert} from './utils.js';
import {initValidation} from './validation.js';
import {changeFilter, showFilter} from './filter.js';
import {setState, getState} from './state.js';
import {renderSmallItems} from './small-items.js';

const RENDER_DELAY = 500;

getData()
  .then((items) => {
    setState(items);
  })
  .then(() => {
    renderSmallItems(getState());
    initGallery(getState());
    changeFilter(debounce(() => renderSmallItems(getState()), RENDER_DELAY));
    showFilter();
  })
  .catch((err) => {
    showAlert(err.message);
  });

initFormUpload(initValidation, hideFormUpload);
