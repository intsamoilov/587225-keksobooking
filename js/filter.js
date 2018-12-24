'use strict';
(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGHT = 50000;
  var rawArray;
  var price = window.variables.filter.querySelector('#housing-price');
  var rooms = window.variables.filter.querySelector('#housing-rooms');
  var guests = window.variables.filter.querySelector('#housing-guests');
  var type = window.variables.filter.querySelector('#housing-type');
  var features = window.variables.filter.querySelector('#housing-features');

  var typeFilter = function (element) {
    return (type.value !== 'any') ? element.offer.type === type.value : true;
  };

  var priceFilter = function (element) {
    switch (price.value) {
      case 'low':
        return element.offer.price < PRICE_LOW;
      case 'middle':
        return element.offer.price >= PRICE_LOW && element.offer.price <= PRICE_HIGHT;
      case 'high':
        return element.offer.price > PRICE_HIGHT;
    }
    return true;
  };

  var roomFilter = function (element) {
    return (rooms.value !== 'any') ? element.offer.rooms.toString() === rooms.value : true;
  };

  var guestsFilter = function (element) {
    return (guests.value !== 'any') ? element.offer.guests.toString() === guests.value : true;
  };

  var featuresFilter = function (element) {
    var checkedFeatures = Array.prototype.slice.call(features.querySelectorAll('input[type = checkbox]:checked'), 0);
    return checkedFeatures.every(function (filter) {
      return (element.offer.features.indexOf(filter.value) !== -1);
    });
  };

  var getActualData = function () {
    return rawArray
      .filter(typeFilter)
      .filter(priceFilter)
      .filter(roomFilter)
      .filter(guestsFilter)
      .filter(featuresFilter);
  };

  var refreshPins = function () {
    var filteredData = getActualData();
    window.popup.hideCard();
    window.pins.removePins();
    window.pins.renderPins(filteredData);
  };
  var filterElementsChangeHandler = window.debounce(refreshPins);

  window.filter = {
    addFilterListeners: function () {
      window.variables.filter.addEventListener('change', filterElementsChangeHandler, true);
    },

    saveRawData: function (serverData) {
      rawArray = serverData;
    }
  };
})();
