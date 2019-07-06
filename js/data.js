'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var CLASSIFIED_QUANTITY = 8;

  var classifiedListWidth = document.querySelector('.map__pins').offsetWidth;

  var CLASSIFIED_COORD_LIMITS = {
    minX: 0,
    maxX: classifiedListWidth,
    minY: 130,
    maxY: 630
  };

  var сlassifieds = null;

  var getClassifieds = function () {
    if (сlassifieds === null) {
      сlassifieds = [];

      var getData = function (arr) {
        for (var i = 0; i < arr.length; i++) {
          сlassifieds.push(arr[i]);
        }
      };

      window.load(URL, getData, window.error.renderErrorNotice);
    }

    return сlassifieds;
  };

  window.data = {
    CLASSIFIED_QUANTITY: CLASSIFIED_QUANTITY,
    CLASSIFIED_COORD_LIMITS: CLASSIFIED_COORD_LIMITS,
    getClassifieds: getClassifieds
  };

})();
