'use strict';

(function () {
  var CLASSIFIED_QUANTITY = 8;

  var classifiedList = document.querySelector('.map__pins');
  var classifiedListWidth = classifiedList.offsetWidth;
  var classifiedTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var CLASSIFIED_COORD_LIMITS = {
    minX: 0,
    maxX: classifiedList.offsetWidth,
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

  var getClassifieds = function (quantity) {
    var сlassifieds = [];

    for (var i = 0; i < quantity; i++) {
      сlassifieds.push(getRandomClassified());
    }

    return сlassifieds;
  };

  var renderClassifieds = function (arr) {
    var fragment = document.createDocumentFragment();

    // Получение размеров метки объявления
    classifiedTemplate.style.position = 'absolute';
    classifiedTemplate.style.left = '-1000px';
    document.body.appendChild(classifiedTemplate);
    var classifiedTemplateParams = classifiedTemplate.getBoundingClientRect();
    document.body.removeChild(classifiedTemplate);
    var pinWidth = classifiedTemplateParams.width;
    var pinHeight = classifiedTemplateParams.height;

    arr.forEach(function (сlassified) {
      var classifiedElement = classifiedTemplate.cloneNode(true);
      // Получение координат острого конца метки объявления
      var left = сlassified.location.x - pinWidth / 2;
      var top = сlassified.location.y - pinHeight;

      classifiedElement.style = 'left: ' + left + 'px; top: ' + top + 'px;';
      classifiedElement.querySelector('img').src = сlassified.author.avatar;
      classifiedElement.querySelector('img').alt = сlassified.offer.type;

      fragment.appendChild(classifiedElement);
    });

    classifiedList.appendChild(fragment);
  };

  var classifieds = getClassifieds(CLASSIFIED_QUANTITY);

  window.data = {
    CLASSIFIED_QUANTITY: CLASSIFIED_QUANTITY,
    CLASSIFIED_COORD_LIMITS: CLASSIFIED_COORD_LIMITS,
    classifiedList: classifiedList,
    renderClassifieds: renderClassifieds,
    classifieds: classifieds
  };

})();
