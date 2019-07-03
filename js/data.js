'use strict';

(function () {
  var CLASSIFIED_QUANTITY = 8;

  var classifiedListWidth = document.querySelector('.map__pins').offsetWidth;

  var CLASSIFIED_COORD_LIMITS = {
    minX: 0,
    maxX: classifiedListWidth,
    minY: 130,
    maxY: 630
  };

  var getRandomClassified = function () {
    var imageLink = 'img/avatars/user0' + window.util.getRandomInt(1, CLASSIFIED_QUANTITY) + '.png';
    var types = ['palace', 'flat', 'house', 'bungalo'];

    return {
      author: {
        avatar: imageLink
      },
      offer: {
        type: types[window.util.getRandomInt(0, types.length - 1)]
      },
      location: {
        x: window.util.getRandomInt(0, classifiedListWidth),
        y: window.util.getRandomInt(CLASSIFIED_COORD_LIMITS.minY, CLASSIFIED_COORD_LIMITS.maxY)
      }
    };
  };

  var сlassifieds = null;

  var getClassifieds = function (quantity) {
    if (сlassifieds === null) {
      сlassifieds = [];

      for (var i = 0; i < quantity; i++) {
        сlassifieds.push(getRandomClassified());
      }

      return сlassifieds;
    } else {
      return сlassifieds;
    }
  };

  window.data = {
    CLASSIFIED_QUANTITY: CLASSIFIED_QUANTITY,
    CLASSIFIED_COORD_LIMITS: CLASSIFIED_COORD_LIMITS,
    getClassifieds: getClassifieds
  };

})();
