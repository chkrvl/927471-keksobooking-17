'use strict';

(function () {
  // при изменении value у любого из select в map__filters
  // меняется массив объявлений: остаются только те, чьи offer.type равен select.value
  // рендерится измененный массив


  var mapFiltersForm = document.querySelector('.map__filters');

  var appropriateClassifieds = [];


  var filterClassifieds = function (arr) {
    var rawClassifieds = arr.slice();

    var typeSelect = mapFiltersForm.querySelector('#housing-type');

    var selectFilter = function (select, param) {
      if (select.value !== 'any') {
        appropriateClassifieds = rawClassifieds.filter(function (it) {
          return it.offer[param].toString() === select.value;
        });
      } else {
        appropriateClassifieds = rawClassifieds;
      }
    };

    selectFilter(typeSelect, 'type');
  };

  mapFiltersForm.addEventListener('change', function () {
    filterClassifieds(window.data.getClassifieds());

    window.render.removeClassifieds();
    window.render.renderClassifieds(appropriateClassifieds);
  });

})();
