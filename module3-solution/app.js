(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService);
  //.directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'menuItems.html',
      scope: {
        foundItems : '<'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;

    list.filteredList = []

    list.getMatchedMenuItems = function() {
       console.log('hello '+list.searchTerm);
       var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);


      promise.then(function success(response){
        var foundItems = [];
        var responseItems = response.data.menu_items;
        console.log("searchTerm "+list.searchTerm);
        for (var i=0; i<responseItems.length; i++) {
          if (responseItems[i].description.includes(list.searchTerm)) {
            foundItems.push(responseItems[i]);
          }
        }
        console.log(foundItems);
        list.filteredList = foundItems;
        return foundItems;
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
