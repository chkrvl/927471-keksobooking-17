'use strict';

(function () {
  window.map.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var pinParams = window.map.getMainPinParams(window.map.mainMapPin);

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

      var mainMapPinX = window.map.mainMapPin.offsetLeft - shift.x;
      if (mainMapPinX < window.data.CLASSIFIED_COORD_LIMITS.minX - pinParams.width / 2) {
        mainMapPinX = window.data.CLASSIFIED_COORD_LIMITS.minX;
      } else if (mainMapPinX > window.data.CLASSIFIED_COORD_LIMITS.maxX - pinParams.width / 2) {
        mainMapPinX = window.data.CLASSIFIED_COORD_LIMITS.maxX - pinParams.width / 2;
      }

      var mainMapPinY = window.map.mainMapPin.offsetTop - shift.y;
      if (mainMapPinY < window.data.CLASSIFIED_COORD_LIMITS.minY) {
        mainMapPinY = window.data.CLASSIFIED_COORD_LIMITS.minY;
      } else if (mainMapPinY > window.data.CLASSIFIED_COORD_LIMITS.maxY) {
        mainMapPinY = window.data.CLASSIFIED_COORD_LIMITS.maxY;
      }

      window.map.mainMapPin.style.top = mainMapPinY + 'px';
      window.map.mainMapPin.style.left = mainMapPinX + 'px';
    };

    var onMouseUp = function (upEvt) {
      var getAdressCoords = function () {

        return {
          x: Math.round(pinParams.x + pinParams.width / 2),
          y: Math.round(pinParams.y + pinParams.height)
        };
      };

      var fillAdressInput = function (x, y) {
        var address = x + ', ' + y;
        window.map.adressFormInput.value = address;
      };

      upEvt.preventDefault();

      fillAdressInput(getAdressCoords().x, getAdressCoords().y);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.form.makeActive();
  });

})();
