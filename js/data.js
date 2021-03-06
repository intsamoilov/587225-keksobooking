'use strict';
(function () {
  var callbackOnLoad = function (data) {
    window.pins.renderPins(data);
    window.filter.saveRawData(data);
  };

  var callbackOnError = function (status) {
    var messageStatus = window.variables.errorMessage + status;
    window.messages.createMessage('error', messageStatus);
  };

  window.data = {
    getDataArray: function () {
      window.backend.load(callbackOnLoad, callbackOnError, 'GET', window.variables.LOAD_SERVER_URL);
    }
  };
})();
