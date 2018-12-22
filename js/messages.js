'use strict';
(function () {
  var status;
  var hideMessage = function () {
    document.querySelector('.' + status).remove();
  };

  var onEscKeyDown = function (evt) {
    if (evt.keyCode === window.variables.KeyCode.ESC) {
      hideMessage();
    }
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('mouseup', onMouseClick);
  };

  var onMouseClick = function () {
    hideMessage();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('mouseup', onMouseClick);
  };

  window.messages = {
    createMessage: function (message, text) {
      status = message;
      var messageTemplate = document.querySelector('#' + message).content.cloneNode(true);
      document.querySelector('main').appendChild(messageTemplate);
      document.querySelector('.' + status + '__message').textContent = text;
      document.addEventListener('mouseup', onMouseClick);
      document.addEventListener('keydown', onEscKeyDown);
    }
  };
})();
