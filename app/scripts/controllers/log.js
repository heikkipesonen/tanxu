'use strict';

/**
 * @ngdoc function
 * @name tankkausApp.controller:LogCtrl
 * @description
 * # LogCtrl
 * Controller of the tankkausApp
 */
angular.module('tankkausApp')
  .controller('LogCtrl',['$scope','$http','API_URL', function ($scope, $http, API_URL) {
  	
  	angular.extend($scope, {
  		get:function(){
  			$http.get(API_URL+'/log/'+$scope.tank.id).then(function(response){
  				$scope.log = response.data;
  			}, function(){
  				alert('Logia ei nyt sitten saatu haettua..');
  			});
  		}
  	});

  }]);
