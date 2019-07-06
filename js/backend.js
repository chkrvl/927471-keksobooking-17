'use strict';

(function () {
  var SUCCESS_ANSWER_CODE = 200;
  var MAX_TIMEOUT = 10000; // в миллисекундах

  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_ANSWER_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = MAX_TIMEOUT;

    xhr.open('GET', url);
    xhr.send();
  };
})();
