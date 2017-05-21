(function() {
  'use strict';

  angular.module('MenuApp')
  .component('categoryItems', {
    templateUrl: 'src/menu/templates/items.template.html',
    bindings: {
      items: '<'
    }
  });
})();
