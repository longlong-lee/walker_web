'use strict';

module.exports = function () {
  return function (input) {
    var data = '';
    if(input.length <= 4){
      data = input;
    }else {
      data = input.substring(0, 3) + '...';
    }
    return data;
  };
};