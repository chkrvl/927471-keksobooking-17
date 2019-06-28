'use strict';

window.util = (function () {
  return {
    // Получение случайного целого значения в промежутке min и max, включая min и max
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
