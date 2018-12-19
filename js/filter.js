'use strict';
(function () {
  var rawArray;
  var price = window.variables.filter.querySelector('#housing-price');
  var rooms = window.variables.filter.querySelector('#housing-rooms');
  var guests = window.variables.filter.querySelector('#housing-guests');
  var type = window.variables.filter.querySelector('#housing-type');
  var features = window.variables.filter.querySelector('#housing-features');
  var priceLow = 10000;
  var priceHight = 50000;
  // --------------------------------------------------------------------------
  var typeFilter = function (element) {
    return (type.value !== 'any') ? element.offer.type === type.value : true;
  };
  // --------------------------------------------------------------------------
  var priceFilter = function (element) {
    switch (price.value) {
      case 'low':
        return element.offer.price < priceLow;
      case 'middle':
        return element.offer.price >= priceLow && element.offer.price <= priceHight;
      case 'high':
        return element.offer.price > priceHight;
    }
    return true;
  };
  // --------------------------------------------------------------------------
  var roomFilter = function (element) {
    return (rooms.value !== 'any') ? element.offer.rooms.toString() === rooms.value : true;
  };
  // --------------------------------------------------------------------------
  var guestsFilter = function (element) {
    return (guests.value !== 'any') ? element.offer.guests.toString() === guests.value : true;
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
    return filterByFeatures(rawArray
      .filter(typeFilter)
      .filter(priceFilter)
      .filter(roomFilter)
      .filter(guestsFilter));
  };
  // --------------------------------------------------------------------------
  var refreshPins = function () {
    var filteredData = getActualData();
    window.popup.hideCard();
    window.pins.removePins();
    window.pins.renderPins(filteredData);
  };
  var filterElementsChangeHandler = window.debounce(refreshPins);
  // --------------------------------------------------------------------------
  window.filter = {
    addFilterListeners: function () {
      window.variables.filter.addEventListener('change', filterElementsChangeHandler, true);
    },
    // ------------------------------------------------------------------------
    saveRawData: function (serverData) {
      rawArray = serverData;
    }
  };
})();
