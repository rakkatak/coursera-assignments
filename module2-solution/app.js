(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var buyController = this;

  buyController.items = ShoppingListService.getToBuyItems();

  buyController.buyItem = function(index) {
    ShoppingListService.buyItem(index);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
  var boughtController = this;

  boughtController.items = ShoppingListService.getBoughtItems();
}


function ShoppingListService() {
   var shoppingListService = this;
   var toBuyArr = [{name: "apples", quantity: "5"},
                   {name: "spinach", quantity: "1"},
                   {name: "bread", quantity: "1"},
                   {name: "cheese", quantity: "2"},
                   {name: "container of olives", quantity: "1"},];
   var alreadyBoughtArr = [];

   shoppingListService.buyItem = function(index) {
     // get item to put in bought list
     var boughtItem = toBuyArr[index];
     // remove item from toBuyArr
     toBuyArr.splice(index, 1);
     // add to alreadyBoughtArr
     alreadyBoughtArr.push(boughtItem);
   }

   shoppingListService.getBoughtItems = function() {
     return alreadyBoughtArr;
   }

   shoppingListService.getToBuyItems = function() {
     return toBuyArr;
   }
}

})();
