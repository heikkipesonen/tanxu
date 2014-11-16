'use strict';

/**
 * @ngdoc function
 * @name tankkausApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tankkausApp
 */
angular.module('tankkausApp')

  .controller('MainCtrl', ['$scope','API_URL','$http','Tank','$timeout','localStorageService','planeService', function($scope, API_URL, $http, Tank, $timeout, localStorageService, planeService){

    angular.extend($scope, {
      view:'view-main',
      tank:false,
      plane:planeService,
      loading:false,      
      eventType:{
      	'0':'Täyttö',
      	'1':'Tank.'
     	},

      set:function(index){
        $scope.tank = $scope.tanks[index];
        $timeout(function(){});
        localStorageService.set('tanxu-tank', index);
      },

      setNext:function(){
      	var current = $scope.tanks.indexOf($scope.tank);
      	var next = current < $scope.tanks.length -1 ? current+1 : 0;
      	$scope.set(next);
      },

      setPrev:function(){
      	var current = $scope.tanks.indexOf($scope.tank);
      	var prev = current  > 0 ? current-1 : $scope.tanks.length-1;
      	$scope.set(prev);
      },

      nextPlane:function(){
        planeService.next();
      },

      prevPlane:function(){
        planeService.prev();
      },

      fill:function(){
        var confirm = window.confirm('Täytä pouseri '+$scope.tank.name + '?');
        if (confirm){
        	$scope.loading = true;
          $scope.tank.fill().then(function(response){
          	$scope.loading = false;
            if (response === false){
              alert('Ei täytetty, ku ei onnistunu :(');
            } else {
            	$scope.view = 'view-main';
            }
          });
        }        
      },
  		
  		getLog:function(){
  			$scope.tank.getLog();
  		},

  		takeFuel:function(){
        if ($scope.tank && planeService.register && $scope.tank.take.value){
  				$scope.loading = true;
  				
  				$scope.tank.takeFuel().then(function(response){
  					$scope.loading = false;
  					if (response === false){
 							alert('Ei tankattu ku ei onnistununna :(');
  					}
  				});

        } else {
          alert('Pitäs laittaa rek nro ja tankattu määrä. kuitenni..');
        }
  		},

      get:function(){
      	$scope.loading = true;
        $http.get(API_URL+'/tank').then(function(response){
          $scope.tanks = [];
          $scope.loading = false;        

          angular.forEach(response.data, function(tank){
            $scope.tanks.push( new Tank(tank) );
          });
			
					var data = localStorageService.get('tanxu-tank');
					if (data !== undefined && data !== null && data !== false){
						$scope.set(data);
					} else {
          	$scope.set(0);
					}


        },function(){
        	$scope.loading = false;
            alert('Ei saatu dataa. :(');
        });
      }
    });

		planeService.load();
    $scope.get();
  }])
