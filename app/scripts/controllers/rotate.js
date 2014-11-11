'use strict';

/**
 * @ngdoc function
 * @name tankkausApp.controller:RotateCtrl
 * @description
 * # RotateCtrl
 * Controller of the tankkausApp
 */
angular.module('tankkausApp')
  .controller('RotateCtrl', function ($scope, $element) {
  	angular.extend($scope, {
  		init:function(){

  			$scope.r = new Rotateable($element);  			
  		}
  	});

  	
  });
