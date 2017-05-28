(function() {
  "use strict";

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ["SignupService", "allMenuItems"];
  function SignupController(SignupService, allMenuItems) {
    var signupCtrl = this;
    signupCtrl.allMenuItems = allMenuItems.menu_items;

    signupCtrl.submit = function() {
      signupCtrl.setFavoriteMenuItem();
      signupCtrl.currentUser = SignupService.saveSignupInfo(signupCtrl.user);
    };

    signupCtrl.setFavoriteMenuItem = function() {
      for (var i=0;i<signupCtrl.allMenuItems.length;i++) {
        if (angular.equals(signupCtrl.allMenuItems[i].short_name.toLowerCase(),signupCtrl.user.favoriteMenuItemShortName.toLowerCase())) {
          signupCtrl.user.favoriteMenuItem = signupCtrl.allMenuItems[i];
          break;
        }
      }
    };

    signupCtrl.menuItemComparator = function(input) {
        return (typeof input === 'object' || typeof input === 'number' || typeof input === 'boolean') ? false : angular.equals(input.toLowerCase(),signupCtrl.user.favoriteMenuItemShortName.toLowerCase());
    };
  }
})();
