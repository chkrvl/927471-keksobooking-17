'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var map = document.querySelector('.map');
  var mapFiltersForm = map.querySelector('.map__filters');
  var mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
  var initialClassifiedListChildrenQuantity = window.render.classifiedList.children.length;

  var priceFormInput = adForm.querySelector('#price');
  var typeFormSelect = adForm.querySelector('#type');
  var timeInFormSelect = adForm.querySelector('#timein');
  var timeOutFormSelect = adForm.querySelector('#timeout');

  var BUNGALO_PRICE_THRESHOLD = '0';
  var FLAT_PRICE_THRESHOLD = '1000';
  var HOUSE_PRICE_THRESHOLD = '5000';
  var PALACE_PRICE_THRESHOLD = '10000';

  var disableFormElements = function (arr, status) {
    arr.forEach(function (element) {
      element.disabled = status;
    });
  };

  adFormHeader.disabled = true;
  disableFormElements(adFormElements, true);
  disableFormElements(mapFiltersFormElements, true);

  var makeActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormHeader.disabled = false;
    disableFormElements(adFormElements, false);
    disableFormElements(mapFiltersFormElements, false);
    if (window.render.classifiedList.children.length < initialClassifiedListChildrenQuantity + window.data.CLASSIFIED_QUANTITY) {
      window.render.renderClassifieds(window.data.classifieds);
    }
  };

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

  window.form = {
    makeActive: makeActive
  };

})();
