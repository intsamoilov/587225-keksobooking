'use strict';
(function () {
  // --------------------------------------------------------------------------
  var callbackOnLoad = function (data) {
    window.pins.renderPins(data, window.variables.AD_COUNT);
    window.filter.saveRawData(data);
  };
  // --------------------------------------------------------------------------
  var callbackOnError = function (status) {
    var messageStatus = window.variables.errorMessage + status;
    window.messages.createMessage('error', messageStatus);
  };
  // --------------------------------------------------------------------------
  window.data = {
    getDataArray: function () {
      window.backend.loadFromServer(callbackOnLoad, callbackOnError);
    }
  };
})();
