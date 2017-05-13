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
        listEmpty: '='
      },
      //  controller: FoundItemsDirectiveController,
      controllerAs: 'list'
      //  bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.itemsInList = function() {
       if (list.items.length==0) {
         return true;
       } else {
         return false;
       }
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;

    list.items = [];

    list.listEmpty = false;

    list.removeItem = function(itemIndex) {
      console.log('hello');
      list.items.splice(itemIndex,1);
    };

    list.getMatchedMenuItems = function() {
      list.items = [];

        var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
        promise.then(function success(response){
          var responseItems = response.data.menu_items;
          for (var i=0; i<responseItems.length; i++) {
            if (responseItems[i].description.includes(list.searchTerm)) {
              list.items.push(responseItems[i]);
            }
          }

          if (list.items.length==0) {
            list.listEmpty = true;
          }
        }).catch(function(error) {
          console.log(error);
        });
    };

  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      var response = $http({
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      });
      return response;
    }
  }


})();
