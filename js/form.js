'use strict';
(function () {
  var allElements = window.variables.adForm.elements;
  var roomNumber = document.querySelector('#room_number');
  var type = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var price = document.querySelector('#price');
  var roomCapacity = document.querySelector('#capacity');
  var adress = document.querySelector('#address');
  var btnReset = document.querySelector('.ad-form__reset');
  var options = roomCapacity.querySelectorAll('option');
  var resetAll;
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
    price.min = window.variables.MapTypeToValues[evt.value].price;
    price.placeholder = window.variables.MapTypeToValues[evt.value].price;
  };
  // --------------------------------------------------------------------------
  var setGuestsValidityByRooms = function (evt) {
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
  var callbackOnLoad = function () {
    var messageStatus = window.variables.successMessage;
    window.messages.createMessage('success', messageStatus);
    resetAll();
  };
  // --------------------------------------------------------------------------
  var callbackOnError = function (status) {
    var messageStatus = window.variables.errorMessage + status;
    window.messages.createMessage('error', messageStatus);
  };
  // --------------------------------------------------------------------------
  var btnResetClickHandler = function () {
    resetAll();
  };
  // --------------------------------------------------------------------------
  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.uploadToServer(new FormData(evt.currentTarget), callbackOnLoad, callbackOnError);
  };
  // --------------------------------------------------------------------------
  var getCoordinates = function (target, offsetX, offsetY) {
    var x = target.offsetLeft + offsetX;
    var y = target.offsetTop + offsetY;
    return x + ', ' + y;
  };
  // --------------------------------------------------------------------------
  window.form = {
    addFormListeners: function () {
      var form = document.querySelector('.ad-form');
      form.addEventListener('change', formElementsChangeHandler, true);
      form.addEventListener('invalid', formElementsInvalidHandler, true);
      form.addEventListener('submit', formSubmitHandler, true);
      btnReset.addEventListener('click', btnResetClickHandler);
    },
    setAddressToForm: function (target, offsetX, offsetY) {
      adress.value = getCoordinates(target, offsetX, offsetY);
      adress.readOnly = true;
    },
    setFormElementsNonActive: function (option) {
      for (var i = 0; i < allElements.length; i++) {
        allElements[i].setCustomValidity('');
        allElements[i].style = '';
        allElements[i].disabled = option;
      }
    },
    resetAction: function (callback) {
      resetAll = callback;
    }
  };
})();
