'use strict';

/**
 * @ngdoc directive
 * @name tankkausApp.directive:log
 * @description
 * # log
 */
angular.module('tankkausApp')
  .directive('log', function () {
    return {
    	replace:true,
    	scope:{
    		tank:'='
    	},
    	controller:'LogCtrl',
      template:'<table class="log"><tr ng-repeat="row in log"><td ng-repeat="cell in row" ng-bind="cell"></td></tr></table>',
      restrict: 'A'
    };
  });
