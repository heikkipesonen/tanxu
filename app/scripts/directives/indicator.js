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
        direction:'@?',
    		label:'@'
    	},
      template: '<div class="indicator" ng-class="direction"><div class="indicator-bar" ng-style="style"></div><span class="indicator-value" ng-bind="label"></span></div>',
      restrict: 'A',
      replace:true,
      controller:['$scope',function($scope){
      	angular.extend($scope, {      		
      		style:{
            height:'100%',
      			width:'100%'
      		},


      		update:function(){
      			var range = $scope.max-$scope.min;
      			var ratio = $scope.value/range;
      			var percent = ratio*100;
      			
      			percent = percent < 0 ? 0 : percent < 100 ? percent : 100;
      			
            if ($scope.direction === 'vertical'){
              $scope.style.height = percent +'%';
              $scope.style.width = '100%';
            } else {
              $scope.style.width = percent +'%';
              $scope.style.height = '100%';
            }
      			
      		}
      	});

      	$scope.update();

      	$scope.$watch('value', function(){
      		$scope.update();
      	});
      }]
    };
  });
