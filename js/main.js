'use strict';

var CLASSIFIED_QUANTITY = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 75;
var classifiedList = document.querySelector('.map__pins');
var classifiedListWidth = classifiedList.offsetWidth;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

var classifiedTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderClassified = function (сlassified) {
  var classifiedElement = classifiedTemplate.cloneNode(true);
  var left = сlassified.location.x - MAP_PIN_WIDTH / 2;
  var top = сlassified.location.y - MAP_PIN_HEIGHT;

  classifiedElement.setAttribute('style', 'left: ' + left + 'px; top: ' + top + 'px;');
  classifiedElement.querySelector('img').setAttribute('src', сlassified.author.avatar);
  classifiedElement.querySelector('img').setAttribute('alt', сlassified.offer.type);

  return classifiedElement;
};

var fragment = document.createDocumentFragment();
var classifieds = getClassifieds(CLASSIFIED_QUANTITY);

for (var i = 0; i < CLASSIFIED_QUANTITY; i++) {
  fragment.appendChild(renderClassified(classifieds[i]));
}
classifiedList.appendChild(fragment);

document.querySelector('.map').classList.remove('map--faded');
