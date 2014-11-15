'use strict';

/**
 * @ngdoc service
 * @name tankkausApp.tank
 * @description
 * # tank
 * Factory in the tankkausApp.
 */
angular.module('tankkausApp')
  
  .factory('Tank', ['$http','API_URL','planeService', function($http, API_URL, planeService){
    function Tank(data){
      this.busy = false;
      
      this.id = null;
      this.min = 0;
      this.max = 0;
      this.name = null;
      this.value = null;
      this.log = [];

      this.take = {
        value:0
      }

      if (data){
        this.set(data);
      }
    };

    Tank.prototype = {
      getLog:function(){
        var me = this;
        $http.get(API_URL+'/log/'+this.id).then(function(response){
          me.log = response.data;          
        }, function(){
          alert('Logia ei nyt sitten saatu haettua..');
        });
      },      
      set:function(data){
        this.id = data.id;
        this.name = data.name;
        this.min = parseInt(data.min);
        this.max = parseInt(data.max);
        this.value = parseInt(data.value);

        this.getLog();
      },
      fill:function(){
        var me = this;
        if (this.busy) return;
        this.busy = true;

        return $http.post(API_URL+'/fill/'+this.id).then(function(response){
          me.value = response.data.value;
          me.busy = false;
          me.getLog();
          return true;
        },function(response){
          me.busy = false;
          return false;
        });
      },
      takeFuel:function(){
        var me = this;
        if (this.busy) return;
        this.busy = true;

        if (!planeService.register || !this.take.value){
          alert('Pitäs laittaa rek nro ja tankattu määrä. kuitenni..');
          return;
        }

        return $http.post(API_URL+'/take/'+this.id, {value:this.take.value, register:planeService.register})
          .then(function(response){
            me.value = response.data.value;
            me.take.value = 0;
            me.busy = false;

            me.getLog();
            planeService.save();

            return true;
          }, function(response){
            alert('Ei tankattu ku ei onnistununna :(');

            me.busy = false;
            return false;
          });
      }
    }

    return Tank;
  }])
