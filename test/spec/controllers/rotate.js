'use strict';

describe('Controller: RotateCtrl', function () {

  // load the controller's module
  beforeEach(module('tankkausApp'));

  var RotateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RotateCtrl = $controller('RotateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
