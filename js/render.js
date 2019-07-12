'use strict';

(function () {
  var CLASSIFIED_QUANTITY = 5;

  var classifiedList = document.querySelector('.map__pins');
  var classifiedTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderClassifieds = function (arr) {
    var fragment = document.createDocumentFragment();

    // ограничение количества отображаемых объявлений
    var limitedClassifieds = arr.slice(0, CLASSIFIED_QUANTITY);

    // Получение размеров метки объявления
    classifiedTemplate.style.position = 'absolute';
    classifiedTemplate.style.left = '-1000px';
    document.body.appendChild(classifiedTemplate);
    var classifiedTemplateParams = classifiedTemplate.getBoundingClientRect();
    document.body.removeChild(classifiedTemplate);
    var pinWidth = classifiedTemplateParams.width;
    var pinHeight = classifiedTemplateParams.height;

    limitedClassifieds.forEach(function (сlassified) {
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

  window.render = {
    renderClassifieds: renderClassifieds,
    classifiedList: classifiedList
  };

})();
