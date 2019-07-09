'use strict';

(function () {
  var main = document.body.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderErrorNotice = function () {
    main.appendChild(errorTemplate);
  };

  window.error = {
    renderErrorNotice: renderErrorNotice
  };
})();
