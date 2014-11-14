'use strict';

describe('Service: plane', function () {

  // load the service's module
  beforeEach(module('tankkausApp'));

  // instantiate service
  var plane;
  beforeEach(inject(function (_plane_) {
    plane = _plane_;
  }));

  it('should do something', function () {
    expect(!!plane).toBe(true);
  });

});
