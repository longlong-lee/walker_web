'use strict';

module.exports = function () {
  return function (input) {
    var data = '';
    if(input.length <= 3){
      data = input;
    }else {
      data = input.substring(0, 3) + '...';
    }
    return data;
  };
};