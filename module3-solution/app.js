(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'menuItems.html',
      scope: {
        items : '<',
        onRemove: '&',
        listEmpty: '<'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.found = [];
    // Flag used to display 'nothing to show' message
    // Initialized to false so message doesn't show when
    // the page first loads.
    list.listEmpty = false;

    list.removeItem = function(itemIndex) {
      list.found.splice(itemIndex,1);
    };

    list.getMatchedMenuItems = function() {
      // Empty list every time
      list.found = [];
      list.listEmpty = true;

      if (list.searchTerm) {
       var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

       promise.then(function (response) {
          list.found = response;
          if (list.found.length==0) {
              list.listEmpty = true;
          } else {
              list.listEmpty = false;
          }
       })
       .catch(function (error) {
         console.log("Something went terribly wrong.");
       });
      }

    };

  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      var found = [];
      return $http({
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function success(response){
        var responseItems = response.data.menu_items;
        for (var i=0; i<responseItems.length; i++) {
          if (responseItems[i].description.includes(searchTerm)) {
            found.push(responseItems[i]);
          }
        }

        return found;
      }).catch(function(error) {
        console.log(error);
      });
    }
  }


})();
