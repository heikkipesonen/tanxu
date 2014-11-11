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
    	controller:'RotateCtrl',
    	template: '<div class="rotate-button"></div>',
      restrict: 'A',
      link: function postLink($scope) {        
        $scope.init();
      }
    };
  });
