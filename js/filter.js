'use strict';
(function () {
  var rawArray;
  var filter = document.querySelector('.map__filters');
  var price = filter.querySelector('#housing-price');
  var rooms = filter.querySelector('#housing-rooms');
  var guests = filter.querySelector('#housing-guests');
  var type = filter.querySelector('#housing-type');
  var features = filter.querySelector('#housing-features');
  var MapPrices = {
    low: [0, 9999],
    middle: [10000, 50000],
    high: [50001, Infinity]
  };
  // --------------------------------------------------------------------------
  var filterByType = function (array) {
    if (type.value !== 'any') {
      array = array.filter(function (element) {
        return element.offer.type === type.value;
      });
    }
    return array;
  };
  // --------------------------------------------------------------------------
  var filterByPrice = function (array) {
    if (price.value !== 'any') {
      array = array.filter(function (element) {
        return element.offer.price >= MapPrices[price.value][0]
          && element.offer.price <= MapPrices[price.value][1];
      });
    }
    return array;
  };
  // --------------------------------------------------------------------------
  var filterByRooms = function (array) {
    if (rooms.value !== 'any') {
      array = array.filter(function (element) {
        return element.offer.rooms.toString() === rooms.value;
      });
    }
    return array;
  };
  // --------------------------------------------------------------------------
  var filterByGuests = function (array) {
    if (guests.value !== 'any') {
      array = array.filter(function (element) {
        return element.offer.guests.toString() === guests.value;
      });
    }
    return array;
  };
  // --------------------------------------------------------------------------
  var filterByFeatures = function (array) {
    var finishArray = [];
    var checkedFeatures = features.querySelectorAll('input[type = checkbox]:checked');
    var checkedFeaturesArray = Object.keys(checkedFeatures).map(function (i) {
      return checkedFeatures[i].value;
    });
    Object.keys(array).forEach(function (index) {
      var buffer = [];
      Object.keys(checkedFeaturesArray).forEach(function (indexCheck) {
        if (array[index].offer.features.indexOf(checkedFeaturesArray[indexCheck]) !== -1) {
          buffer.push(checkedFeaturesArray[indexCheck]);
        }
      });
      if (buffer.length === checkedFeaturesArray.length) {
        finishArray.push(array[index]);
      }
    });
    return finishArray;
  };
  // --------------------------------------------------------------------------
  var getActualData = function () {
    var arrayByType = filterByType(rawArray);
    var arrayByPrice = filterByPrice(arrayByType);
    var arrayByRooms = filterByRooms(arrayByPrice);
    var arrayByGuests = filterByGuests(arrayByRooms);
    var arrayByFeatures = filterByFeatures(arrayByGuests);
    return arrayByFeatures;
  };
  // --------------------------------------------------------------------------
  var refreshPins = function () {
    var filteredData = getActualData();
    window.popup.hideCard();
    window.pins.removePins();
    window.pins.renderPins(filteredData, filteredData.length);
  };
  var filterElementsChangeHandler = window.debounce(refreshPins);
  // --------------------------------------------------------------------------
  window.filter = {
    addFilterListeners: function () {
      filter.addEventListener('change', filterElementsChangeHandler, true);
    },
    // ------------------------------------------------------------------------
    saveRawData: function (serverData) {
      rawArray = serverData;
    }
  };
})();
