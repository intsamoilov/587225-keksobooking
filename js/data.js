'use strict';
(function () {
  // --------------------------------------------------------------------------
  var onLoad = function (data) {
    window.pins.renderPins(data);
  };
  // --------------------------------------------------------------------------
  var onError = function (status) {
    var messageStatus = window.variables.errorMessage + status;
    window.messages.createMessage('error', messageStatus);
  };
  // --------------------------------------------------------------------------
  window.data = {
    getDataArray: function () {
      window.backend.loadFromServer(onLoad, onError);
    }
  };
})();
