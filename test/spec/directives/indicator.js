'use strict';

describe('Directive: indicator', function () {

  // load the directive's module
  beforeEach(module('tankkausApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<indicator></indicator>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the indicator directive');
  }));
});
