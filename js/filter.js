'use strict';

(function () {
  // при изменении value у любого из select в map__filters
  // меняется массив объявлений: остаются только те, чьи offer.type равен select.value
  // рендерится измененный массив


  var mapFiltersForm = document.querySelector('.map__filters');
  // var mapFiltersFormElements = Array.from(mapFiltersForm.querySelectorAll('.map__filter'));

  var appropriateClassifieds = [];
  // var inappropriateClassifieds = [];

  var filterClassifieds = function (arr) {
    var rawClassifieds = arr.slice();

    var typeSelect = mapFiltersForm.querySelector('#housing-type');
    // var roomsSelect = mapFiltersForm.querySelector('#housing-rooms');
    // var guestsSelect = mapFiltersForm.querySelector('#housing-guests');

    var selectFilter = function (select, param) {
      if (select.value !== 'any') {
        appropriateClassifieds = rawClassifieds.filter(function (it) {
          return it.offer[param].toString() === select.value;
        });
        // inappropriateClassifieds = filteredClassifieds.filter(function (it) {
        //   return it.offer[param].toString() !== select.value;
        // });
      } else {
        appropriateClassifieds = rawClassifieds;
      }
    };

    selectFilter(typeSelect, 'type');
    // selectFilter(roomsSelect, 'rooms');
    // selectFilter(guestsSelect, 'guests');
  };

  mapFiltersForm.addEventListener('change', function () {
    filterClassifieds(window.data.getClassifieds());

    // console.log(appropriateClassifieds);
    // console.log(inappropriateClassifieds);

    window.render.removeClassifieds();
    window.render.renderClassifieds(appropriateClassifieds);
  });

})();
