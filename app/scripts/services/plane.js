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
    this.planes = ['OH-CVZ','OH-JIK','CH-737'];

    this.next = function(){
			var i = this.planes.indexOf(this.register) + 1;
			if (i > this.planes.length -1 ){
				i = 0;
			}

    	this.register = this.planes[i];
    }

    this.prev = function(){
			var i = this.planes.indexOf(this.register) - 1;
			if (i < 0 ){
				i = this.planes.length-1;
			}

			this.register = this.planes[i];
    }

    this.save = function(){
    	localStorageService.set('tanxu-plane',this.register);
    }

    this.load = function(){
    	this.register = localStorageService.get('tanxu-plane');
    }

  }]);
