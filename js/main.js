'use strict';

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

var initialClassifiedListChildrenQuantity = classifiedList.children.length;

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

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormHeader = adForm.querySelector('.ad-form-header');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var adressFormInput = adForm.querySelector('#address');
var mapFiltersForm = map.querySelector('.map__filters');
var mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
var mainMapPin = document.querySelector('.map__pin--main');

// получение параметров основной метки
var setMainPinParams = function (pin) {
  window.pinParams = {
    x: pin.offsetLeft,
    y: pin.offsetTop,
    width: pin.offsetWidth,
    height: pin.offsetHeight
  };
};

var getDefaultAdressInputValue = function () {
  setMainPinParams(mainMapPin);
  adressFormInput.value = (Math.round(window.pinParams.x + window.pinParams.width / 2)) + ', ' + (Math.round(window.pinParams.y + window.pinParams.height / 2));
};

getDefaultAdressInputValue();

var enableFormElements = function (arr) {
  arr.forEach(function (element) {
    element.disabled = false;
  });
};

var disableFormElements = function (arr) {
  arr.forEach(function (element) {
    element.disabled = true;
  });
};

adFormHeader.disabled = true;
disableFormElements(adFormElements);
disableFormElements(mapFiltersFormElements);

var makeActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  enableFormElements(adFormElements);
  enableFormElements(mapFiltersFormElements);
  if (classifiedList.children.length < initialClassifiedListChildrenQuantity + CLASSIFIED_QUANTITY) {
    renderClassifieds(classifieds);
  }
};

var fillAdressInput = function () {
  setMainPinParams(mainMapPin);
  var address = Math.round(window.pinParams.x + window.pinParams.width / 2) + ', ' + Math.round(window.pinParams.y + window.pinParams.height);
  adressFormInput.value = address;
};

// *****

mainMapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var mainMapPinX = mainMapPin.offsetLeft - shift.x;
    if (mainMapPinX < CLASSIFIED_COORD_LIMITS.minX - window.pinParams.width / 2) {
      mainMapPinX = CLASSIFIED_COORD_LIMITS.minX;
    } else if (mainMapPinX > CLASSIFIED_COORD_LIMITS.maxX - window.pinParams.width / 2) {
      mainMapPinX = CLASSIFIED_COORD_LIMITS.maxX - window.pinParams.width / 2;
    }

    var mainMapPinY = mainMapPin.offsetTop - shift.y;
    if (mainMapPinY < CLASSIFIED_COORD_LIMITS.minY) {
      mainMapPinY = CLASSIFIED_COORD_LIMITS.minY;
    } else if (mainMapPinY > CLASSIFIED_COORD_LIMITS.maxY) {
      mainMapPinY = CLASSIFIED_COORD_LIMITS.maxY;
    }

    mainMapPin.style.top = mainMapPinY + 'px';
    mainMapPin.style.left = mainMapPinX + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    fillAdressInput();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  makeActive();
});

var priceFormInput = adForm.querySelector('#price');
var typeFormSelect = adForm.querySelector('#type');
var timeInFormSelect = adForm.querySelector('#timein');
var timeOutFormSelect = adForm.querySelector('#timeout');

var BUNGALO_PRICE_THRESHOLD = '0';
var FLAT_PRICE_THRESHOLD = '1000';
var HOUSE_PRICE_THRESHOLD = '5000';
var PALACE_PRICE_THRESHOLD = '10000';

var getTypes = function () {
  var types = [];
  var lodgingThresholds = {
    bungalo: BUNGALO_PRICE_THRESHOLD,
    flat: FLAT_PRICE_THRESHOLD,
    house: HOUSE_PRICE_THRESHOLD,
    palace: PALACE_PRICE_THRESHOLD
  };

  for (var i = 0; i < typeFormSelect.options.length; i++) {
    var option = typeFormSelect.options[i];
    var type = {};

    type.name = option.value;
    type.index = option.index;
    type.minPrice = lodgingThresholds[type.name];
    types.push(type);
  }

  return types;
};

var lodgingTypes = getTypes();

typeFormSelect.addEventListener('change', function (evt) {
  var index = evt.target.selectedIndex;
  priceFormInput.min = lodgingTypes[index].minPrice;
  priceFormInput.placeholder = priceFormInput.min;
});

timeInFormSelect.addEventListener('change', function (evt) {
  if (evt.target.value !== timeOutFormSelect.value) {
    timeOutFormSelect.value = evt.target.value;
  }
});

timeOutFormSelect.addEventListener('change', function (evt) {
  if (evt.target.value !== timeInFormSelect.value) {
    timeInFormSelect.value = evt.target.value;
  }
});
