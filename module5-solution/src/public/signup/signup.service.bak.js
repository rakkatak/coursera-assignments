(function() {
    "use strict";

    angular.module('public')
    .service('SignupService', SignupService);

    SignupService.$inject = ['$rootScope'];

    function SignupService($rootScope) {
      var signupService = this;
      signupService.users = [];

      signupService.saveSignupInfo = function(user) {
        var ssUser = signupService.initUser(user);

        signupService.pushUser(ssUser);

        for (var i = 0; i<signupService.users.length; i++) {
          console.log(signupService.users[i])
        }
      }

      signupService.initUser = function(user) {
        var ssUser = {};
        ssUser.firstname = user.firstname;
        ssUser.lastname = user.lastname;
        ssUser.email = user.email;
        return ssUser;
      }

      signupService.pushUser = function(user) {
        for (var i = 0; i<signupService.users.length; i++) {
          if (signupService.users[i].email==user.email) {
            console.log("User exists. Replacing...");
            signupService.users.splice(i,1);
            break;
          }
        }

        console.log("Adding user");
        signupService.users.push(user);
      }
    }
})();
