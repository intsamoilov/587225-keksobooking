'use strict';
(function () {
  var roomNumber = document.getElementById('room_number');
  var type = document.getElementById('type');
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var price = document.getElementById('price');
  var roomCapacity = document.getElementById('capacity');
  // --------------------------------------------------------------------------
  var setTimeInOut = function (evt) {
    if (evt === timeIn) {
      timeOut.value = timeIn.value;
    } else {
      timeIn.value = timeOut.value;
    }
  };
  // --------------------------------------------------------------------------
  var setPriceByType = function (evt) {
    price.min = window.map.mapTypeToValues[evt.value].price;
    price.placeholder = window.map.mapTypeToValues[evt.value].price;
  };
  // --------------------------------------------------------------------------
  var setGuestsValidityByRooms = function (evt) {
    var options = roomCapacity.querySelectorAll('option');
    options.forEach(function (item) {
      item.disabled = true;
    });
    if (evt.value === '100') {
      options[0].disabled = false;
    } else {
      for (var i = evt.value; i > 0; i--) {
        options[i].disabled = false;
      }
    }
    checkCapasity();
  };
  // --------------------------------------------------------------------------
  var checkCapasity = function () {
    if (roomCapacity.value > roomNumber.value) {
      roomCapacity.setCustomValidity('Укажите правильное количество гостей');
    } else if (roomCapacity.value === '0' && roomNumber.value !== '100') {
      roomCapacity.setCustomValidity('Добавьте гостей');
    } else if (roomNumber.value === '100' && roomCapacity.value !== '0') {
      roomCapacity.setCustomValidity('Уберите гостей');
    } else {
      roomCapacity.setCustomValidity('');
      roomCapacity.style = '';
    }
  };
  // --------------------------------------------------------------------------
  var formElementsInvalidHandler = function (evt) {
    evt.target.style.border = '3px solid red';
  };
  // --------------------------------------------------------------------------
  var formElementsChangeHandler = function (evt) {
    if (evt.target.validity.valid) {
      evt.target.style = '';
    }
    switch (evt.target) {
      case timeIn:
        setTimeInOut(evt.target);
        break;
      case timeOut:
        setTimeInOut(evt.target);
        break;
      case type:
        setPriceByType(evt.target);
        break;
      case roomNumber:
        setGuestsValidityByRooms(evt.target);
        break;
      case roomCapacity:
        checkCapasity();
        break;
    }
  };
  // --------------------------------------------------------------------------
  window.form = {
    addFormListeners: function () {
      var form = document.querySelector('.ad-form');
      form.addEventListener('change', formElementsChangeHandler, true);
      form.addEventListener('invalid', formElementsInvalidHandler, true);
    }
  };
})();
