'use strict';

/**
 * @ngdoc directive
 * @name tankkausApp.directive:rotate
 * @description
 * # rotate
 */
angular.module('tankkausApp')
  .directive('rotate', function () {
    return {
    	replace:true,
      scope:{
        max:'=',
        value:'='
      },
    	controller:'RotateCtrl',
    	template: '<div class="rotate-wrapper"><div class="rotate-button" ng-transclude></div></div>',
      restrict: 'A',
      transclude:true,
      link: function postLink($scope) {        
        $scope.init();
      }
    };
  });
