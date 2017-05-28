(function() {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['SignupService'];

  function MyInfoController(SignupService) {
    var myInfoCtrl = this;

    myInfoCtrl.init = function() {
      myInfoCtrl.currentUser = SignupService.getCurrentUser();
    }

    myInfoCtrl.init();
  }
})();
