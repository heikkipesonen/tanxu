'use strict';

/**
 * @ngdoc function
 * @name tankkausApp.controller:RotateCtrl
 * @description
 * # RotateCtrl
 * Controller of the tankkausApp
 */
angular.module('tankkausApp')
  .controller('RotateCtrl', function ($scope, $element, $timeout) {
  	angular.extend($scope, {
  		
  		max:150,
  		init:function(){

  			var r = new RotateButton($element[0].children[0]);	
  			$scope.value = r.value;

  			r.onupdate = function(){
  				$scope.value = Math.round( r.value * $scope.max );  				
  				$timeout(function(){});
  			}
  		}
  	});
  });
