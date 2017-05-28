(function() {
  "use strict";

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ["SignupService", "allMenuItems"];
  function SignupController(SignupService, allMenuItems) {
    var signupCtrl = this;
    signupCtrl.allMenuItems = allMenuItems.menu_items;
    signupCtrl.submit = function() {
      SignupService.saveSignupInfo(signupCtrl.user);
    }

    signupCtrl.menuItemComparator = function(input) {
        return (typeof input === 'object' || typeof input === 'number' || typeof input === 'boolean') ? false : angular.equals(input.toLowerCase(),signupCtrl.user.favoriteMenuItem.toLowerCase());
    };
  }
})();
