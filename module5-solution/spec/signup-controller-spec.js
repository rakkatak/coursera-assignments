describe("SignupController", function() {

  beforeEach(module('public'));

  var $controller;
  var signupController;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    var SignUpServiceMock = {};

    var allMenuItemsMock = {"menu_items":[{"id":1,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart","image_present":true},
    {"id":2,"short_name":"A2","name":"Egg Drop Soup","description":"chicken broth with egg drop","price_small":2.25,"price_large":4.5,"small_portion_name":"pint","large_portion_name":"quart","image_present":true},
    {"id":3,"short_name":"A3","name":"Chicken Corn Soup","description":"clear chicken broth with creamy corn and egg drop with white meat chicken pieces","price_small":2.75,"price_large":5.5,"small_portion_name":"pint","large_portion_name":"quart","image_present":true}]};

    signupController =
      $controller('SignupController',
                  {SignupService: SignUpServiceMock, allMenuItems: allMenuItemsMock});

  }));

  it("should return true if argument is equal to favoriteMenuItemShortName", function() {
    // Init favoriteMenuItem to A2
    signupController.user = {"favoriteMenuItemShortName":"A2"}
    // The filter uses a comparator that will let you know if a list item equals the argument
    var favoriteMenuItemEqual = signupController.menuItemComparator("A2");
    expect(favoriteMenuItemEqual).toBe(true);
  });

  it("should return false if argument is not equal to favoriteMenuItemShortName", function() {
    // Init favoriteMenuItem to A2
    signupController.user = {"favoriteMenuItemShortName":"D2"}
    // The filter uses a comparator that will let you know if a list item equals the argument
    var favoriteMenuItemEqual = signupController.menuItemComparator("A2");
    expect(favoriteMenuItemEqual).toBe(false);
  });

  it("should set favoriteMenuItem if the short_name exists", function(){
    signupController.user = {"favoriteMenuItemShortName": "A2", favoriteMenuItem: {}};
    // should set up the favourite menu item based on entered short name
    signupController.setFavoriteMenuItem();
    expect(signupController.user.favoriteMenuItem.short_name).toEqual(signupController.allMenuItems[1].short_name);
  });

});
