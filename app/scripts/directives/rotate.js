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
        value:'='
      },
    	controller:'RotateCtrl',
    	template: '<div class="rotate-wrapper"><div class="rotate-button" ng-transclude></div><h2 class="value" ng-bind="value"></h2></div>',
      restrict: 'A',
      transclude:true,
      link: function postLink($scope) {        
        $scope.init();
      }
    };
  });
