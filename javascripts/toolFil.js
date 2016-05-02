'use strict';

module.exports = function () {
  return function (input) {
    var data = [];
    angular.forEach(input, function (a, b, c) {
      if(a.mixAmount !== a.usedAmount){
        data.push(a);
      }
    });
    return data;
  };
};