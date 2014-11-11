'use strict';

/**
 * @ngdoc overview
 * @name tankkausApp
 * @description
 * # tankkausApp
 *
 * Main module of the application.
 */
angular
  .module('tankkausApp', [
    'ngAnimate',
    'ngResource',    
    'ngTouch'
  ])

  .constant('API_URL', 'http://www.heikkipesonen.fi/tankkaajapojat/backend')

  .factory('Tank', ['$http','API_URL', function($http, API_URL){
    function Tank(data){
      this.busy = false;
      
      this.id = null;
      this.min = 0;
      this.max = 0;
      this.name = null;
      this.value = null;

      this.take = {
        value:null,
        register:null
      }

      if (data){
        this.set(data);
      }
    };

    Tank.prototype = {
      set:function(data){
        this.id = data.id;
        this.name = data.name;
        this.min = data.min;
        this.max = data.max;
        this.value = data.value;
      },
      fill:function(){
        var me = this;
        this.busy = true;

        return $http.post(API_URL+'/fill/'+this.id).then(function(response){
          me.value = response.data.value;
          me.busy = false;
        });
      },
      takeFuel:function(){
        var me = this;      
        this.busy = true;

        return $http.post(API_URL+'/take/'+this.id, {value:this.take.value, register:this.take.register})
          .then(function(response){
            me.value = response.data.value;
            me.take.value = null;
            me.busy = false;
          });
      }
    }

    return Tank;
  }])

  .controller('MainCtrl', ['$scope','API_URL','$http','Tank', function($scope, API_URL, $http, Tank){

    angular.extend($scope, {

      get:function(){
        $http.get(API_URL+'/tank').then(function(response){
          $scope.tanks = [];

          angular.forEach(response.data, function(tank){
            $scope.tanks.push( new Tank(tank) );
          })
        })
      },

      fill:function(tank){
        var confirm = window.confirm('Täytä pouseri '+tank.name + '?');

        if (confirm){
          tank.fill();
        }
      },

      takeFuel:function(tank){
        
        tank.takeFuel();
      },

      toggleVisible:function(tank){
        if (tank.take.visible){          
          tank.take.visible = false;
        } else {
          $scope.setVisible(false);
          tank.take.visible = true;
        }
      },

      setVisible:function(state){
        angular.forEach($scope.tanks, function(tank){
          tank.take.visible = state;
        });
      },

      tanks:[]
    });

    $scope.get();
  }])

