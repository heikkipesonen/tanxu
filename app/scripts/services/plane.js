'use strict';

/**
 * @ngdoc service
 * @name tankkausApp.plane
 * @description
 * # plane
 * Service in the tankkausApp.
 */
angular.module('tankkausApp')
  .service('planeService',['localStorageService', function plane(localStorageService) {
    this.register = null;

    this.save = function(){
    	localStorageService.set('tanxu-plane',this.register);
    }

    this.load = function(){
    	this.register = localStorageService.get('tanxu-plane');
    }

  }]);
