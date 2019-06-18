'use strict';

var CLASSIFIED_QUANTITY = 8;
var classifiedList = document.querySelector('.map__pins');
var classifiedListWidth = classifiedList.offsetWidth;
var classifiedTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Получение случайного целого значения в промежутке min и max, включая min и max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomClassified = function () {
  var imageLink = 'img/avatars/user0' + getRandomInt(1, CLASSIFIED_QUANTITY) + '.png';
  var types = ['palace', 'flat', 'house', 'bungalo'];

  return {
    author: {
      avatar: imageLink
    },
    offer: {
      type: types[getRandomInt(0, types.length - 1)]
    },
    location: {
      x: getRandomInt(0, classifiedListWidth),
      y: getRandomInt(130, 630)
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

renderClassifieds(classifieds);
document.querySelector('.map').classList.remove('map--faded');
