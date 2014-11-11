'use strict';

/**
 * @ngdoc directive
 * @name tankkausApp.directive:indicator
 * @description
 * # indicator
 */
angular.module('tankkausApp')
  .directive('indicator', function () {
    return {
    	scope:{
    		value:'=',
    		max:'=',
    		min:'=',
    		label:'@'
    	},
      template: '<div class="indicator"><div class="indicator-bar" ng-style="style"></div><span class="indicator-value" ng-bind="label"></span></div>',
      restrict: 'A',
      replace:true,
      controller:['$scope',function($scope){
      	angular.extend($scope, {      		
      		style:{
      			width:'50%'
      		},


      		update:function(){
      			var range = $scope.max-$scope.min;
      			var ratio = $scope.value/range;
      			var percent = ratio*100;
      			
      			percent = percent < 0 ? 0 : percent;
      			$scope.style.width = percent +'%';
      			
      		}
      	});

      	$scope.update();

      	$scope.$watch('value', function(){
      		$scope.update();
      	});
      }]
    };
  });
