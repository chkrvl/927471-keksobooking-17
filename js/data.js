'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var сlassifieds = null;

  var getClassifieds = function () {
    if (сlassifieds === null) {
      сlassifieds = [];

      var getData = function (arr) {
        сlassifieds = arr.slice();
        console.log(сlassifieds[0]);
      };

      window.backend.load(URL, getData, window.error.renderErrorNotice);
    }

    return сlassifieds;
  };

  getClassifieds();


  window.data = {
    getClassifieds: getClassifieds
  };

})();
