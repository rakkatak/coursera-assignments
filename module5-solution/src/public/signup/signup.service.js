(function() {
    "use strict";

    angular.module('public')
    .service('SignupService', SignupService);

    SignupService.$inject = ['$rootScope'];

    function SignupService($rootScope) {
      var signupService = this;
      signupService.user = {};

      signupService.saveSignupInfo = function(user) {
        $rootScope.user = user;

        console.log("Signed up user is: ",$rootScope.user);
      }
    }
})();
