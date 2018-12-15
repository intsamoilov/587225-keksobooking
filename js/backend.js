'use strict';
(function () {
  var TIMEOUT = 10000;
  var uploadCallback;
  var uploadErrorCallback;
  var loadCallback;
  var loadErrorCallback;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  // ----------------------------------------------------------------------------
  var xhrUploadEventHandler = function () {
    if (xhr.status === 200) {
      uploadCallback();
    } else {
      uploadErrorCallback(xhr.status);
    }
    xhr.removeEventListener('load', xhrUploadEventHandler);
  };
  // ----------------------------------------------------------------------------
  var xhrUploadTimeOutHandler = function () {
    xhr.timeout = TIMEOUT;
    uploadErrorCallback(xhr.status);
    xhr.removeEventListener('timeout', xhrUploadTimeOutHandler);
  };
  // ----------------------------------------------------------------------------
  var xhrUploadErrorHandler = function () {
    uploadErrorCallback(xhr.status);
    xhr.removeEventListener('error', xhrUploadErrorHandler);
  };
  // ----------------------------------------------------------------------------
  var xhrLoadEventHandler = function () {
    if (xhr.status === 200) {
      loadCallback(xhr.response);
    } else {
      loadErrorCallback(xhr.status);
    }
    xhr.removeEventListener('error', xhrLoadEventHandler);
  };
  // ----------------------------------------------------------------------------
  var xhrLoadTimeOutHandler = function () {
    xhr.timeout = TIMEOUT;
    loadErrorCallback(xhr.status);
    xhr.removeEventListener('timeout', xhrLoadTimeOutHandler);
  };
  // ----------------------------------------------------------------------------
  var xhrLoadErrorHandler = function () {
    loadErrorCallback(xhr.status);
    xhr.removeEventListener('error', xhrLoadErrorHandler);
  };
  // ----------------------------------------------------------------------------
  window.backend = {
    loadFromServer: function (onLoad, onError) {
      loadCallback = onLoad;
      loadErrorCallback = onError;
      xhr.addEventListener('load', xhrLoadEventHandler);
      xhr.addEventListener('error', xhrLoadErrorHandler);
      xhr.addEventListener('timeout', xhrLoadTimeOutHandler);
      xhr.open('GET', window.variables.LOAD_SERVER_URL);
      xhr.send();
    },
    uploadToServer: function (data, onLoad, onError) {
      uploadCallback = onLoad;
      uploadErrorCallback = onError;
      xhr.addEventListener('load', xhrUploadEventHandler);
      xhr.addEventListener('error', xhrUploadErrorHandler);
      xhr.addEventListener('timeout', xhrUploadTimeOutHandler);
      xhr.open('POST', window.variables.UPLOAD_SERVER_URL);
      xhr.send(data);
    }
  };
})();
