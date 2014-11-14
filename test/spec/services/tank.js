'use strict';

describe('Service: tank', function () {

  // load the service's module
  beforeEach(module('tankkausApp'));

  // instantiate service
  var tank;
  beforeEach(inject(function (_tank_) {
    tank = _tank_;
  }));

  it('should do something', function () {
    expect(!!tank).toBe(true);
  });

});
