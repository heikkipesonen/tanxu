'use strict';

/**
 * @ngdoc directive
 * @name tankkausApp.directive:fullHeight
 * @description
 * # fullHeight
 */
angular.module('tankkausApp')
  .directive('fullHeight', function () {
    return {      
      restrict: 'C',
      controller:['$scope','$element','$window', function($scope, $element, $window){
      	var w = angular.element($window);

      	angular.extend($scope, {
      		init:function(){
      			w.bind('resize', $scope.update);
        		$scope.update();
      		},
      		update:function(){
      			$element[0].style['min-height'] = w.height() +'px';
      		}
      	});

      	$scope.$on('$destroy', function(){
      		w.unbind('resize', $scope.update);
      	});
      	
      }],
      link: function postLink($scope) {
        $scope.init();
      }
    };
  });
