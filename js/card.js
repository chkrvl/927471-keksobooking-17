'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersFormContainer = map.querySelector('.map__filters-container');

  var fragment = document.createDocumentFragment();

  var cardElement = mapCardTemplate.cloneNode(true);

  var cardInfo = window.data.getClassifieds()[0];
  console.log(cardInfo);

  var localizedOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  // cardElement.querySelector('.popup__title').textContent = cardInfo.offer.title;
  // cardElement.querySelector('.popup__text--address').textContent = cardInfo.offer.address;
  // cardElement.querySelector('.popup__text--price').textContent = cardInfo.offer.price + '₽/ночь';
  // cardElement.querySelector('.popup__type').textContent = localizedOfferType[cardInfo.offer.type];
  // cardElement.querySelector('.popup__text--capacity').textContent = cardInfo.offer.rooms + ' комнаты для ' + cardInfo.offer.guests + ' гостей';
  // cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardInfo.offer.checkin + ' , выезд до ' + cardInfo.offer.checkout;
  // cardElement.querySelector('.popup__description').textContent = cardInfo.offer.description;
  // cardElement.querySelector('.popup__avatar').src = cardInfo.author.avatar;

  // var photosList = cardElement.querySelector('.popup__photos');

  // var fragmentPhotos = document.createDocumentFragment();

  // cardInfo.offer.photos.forEach(function (source) {
  //   var photo = document.createElement('img');

  //   photo.classList.add('popup__photo');
  //   photo.src = source;
  //   fragmentPhotos.appendChild(photo);
  // });

  // photosList.appendChild(fragmentPhotos);


  fragment.appendChild(cardElement);

  map.insertBefore(fragment, mapFiltersFormContainer);

})();
