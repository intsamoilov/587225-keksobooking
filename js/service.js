'use strict';
(function () {
  window.service = {
    getRandomNum: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // ------------------------------------------------------------------------
    getCutArray: function (array) {
      var cutArray = [];
      var sortArrey = window.service.getShuffleArray(array);
      var index = window.service.getRandomNum(0, array.length - 1);
      for (var i = 0; i <= index; i++) {
        cutArray[i] = sortArrey[i];
      }
      return cutArray;
    },
    // ------------------------------------------------------------------------
    getShuffleArray: function (array) {
      var randomArray = [];
      for (var i = 0; i < array.length; i++) {
        var index = window.service.getRandomNum(1, array.length);
        randomArray[i] = array[index - 1];
        for (var j = 0; j < i; j++) {
          if (randomArray[j] === randomArray[i]) {
            delete randomArray[i];
            i--;
          }
        }
      }
      return randomArray;
    }
    // ------------------------------------------------------------------------
  };
})();
