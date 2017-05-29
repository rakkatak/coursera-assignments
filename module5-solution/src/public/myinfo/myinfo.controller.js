(function() {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['currentUser'];

  function MyInfoController(currentUser) {
    var myInfoCtrl = this;

    myInfoCtrl.currentUser = currentUser;
  }
})();
