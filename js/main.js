import {getData} from './api.js';
import {initGallery} from './gallery.js';
import {hideFormUpload, initFormUpload} from './form-upload.js';
import {showAlert} from './utils.js';
import {initValidation} from './validation.js';
import {changeFilter, showFilter} from './filter.js';
import {setState, getState} from './state.js';
import {renderSmallItems} from './small-items.js';

getData()
  .then((items) => {
    setState(items);
  })
  .then(() => {
    renderSmallItems(getState());
    initGallery(getState());
    changeFilter(renderSmallItems, getState());
    showFilter();
  })
  .catch((err) => {
    showAlert(err.message);
  });

initFormUpload(initValidation, hideFormUpload);
