'use strict';

var CLASSIFIED_QUANTITY = 8;
var classifiedList = document.querySelector('.map__pins');
var classifiedListWidth = document.querySelector('.map__pins').offsetWidth;

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

  classifiedElement.setAttribute('style', 'left: ' + сlassified.location.x + 'px; top: ' + сlassified.location.y + 'px;');
  classifiedElement.querySelector('img').setAttribute('src', сlassified.author.avatar);
  classifiedElement.querySelector('img').setAttribute('alt', сlassified.offer.type);

  return classifiedElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < CLASSIFIED_QUANTITY; i++) {
  fragment.appendChild(renderClassified(getClassifieds(CLASSIFIED_QUANTITY)[i]));
}
classifiedList.appendChild(fragment);

document.querySelector('.map').classList.remove('map--faded');
