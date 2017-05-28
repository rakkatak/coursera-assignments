(function() {
    "use strict";

    angular.module('public')
    .service('SignupService', SignupService);

    SignupService.$inject = ['$rootScope'];

    function SignupService($rootScope) {
      var signupService = this;
      signupService.user = {};

      signupService.saveSignupInfo = function(user) {
        // Ideally we would be saving to a database but we'll use rootScope for the purposes of the assignment
        $rootScope.user = user;
        return user;
      }

      signupService.getCurrentUser = function() {
        // Ideally we would be retrieving from a database but we are using rootScope for the purposes of the assignment
        if ($rootScope.user) {
          return $rootScope.user;
        }
      }
    }
})();
