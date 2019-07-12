'use strict';

(function () {
  var SUCCESS_ANSWER_CODE = 200;
  var MAX_TIMEOUT = 10000; // в миллисекундах

  var load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_ANSWER_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', onError);

    xhr.addEventListener('timeout', onError);

    xhr.timeout = MAX_TIMEOUT;

    xhr.open('GET', url);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
