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
  		init:function(){

  			var r = new RotateButton($element[0].children[0]);	
  			$scope.value = r.value;

  			r.onUpdate = function(direction){
  				var val = $scope.value + direction;
          $scope.value = val > 0 ? val : 0;
          $scope.value = $scope.value < $scope.max ? $scope.value : $scope.max;
          

  				$timeout(function(){});
  			}
  		}
  	});
  });
