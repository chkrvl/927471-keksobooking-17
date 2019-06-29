'use strict';

(function () {
  var adressFormInput = document.querySelector('#address');
  var mainMapPin = document.querySelector('.map__pin--main');

  // получение параметров основной метки
  var getMainPinParams = function (pin) {
    var pinParams = {
      x: pin.offsetLeft,
      y: pin.offsetTop,
      width: pin.offsetWidth,
      height: pin.offsetHeight
    };

    return pinParams;
  };

  // получение координат основной метки до клика
  (function () {
    var pinParams = getMainPinParams(mainMapPin);
    adressFormInput.value = (Math.round(pinParams.x + pinParams.width / 2)) + ', ' + (Math.round(pinParams.y + pinParams.height / 2));
  })();

  window.map = {
    getMainPinParams: getMainPinParams,
    adressFormInput: adressFormInput,
    mainMapPin: mainMapPin
  };

})();


