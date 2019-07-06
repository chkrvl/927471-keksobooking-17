'use strict';

(function () {
    var renderErrorNotice = function () {
    var main = document.body.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');

    main.appendChild(errorTemplate);
  };

  window.error = {
    renderErrorNotice: renderErrorNotice
  }
})();
