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
    'ngTouch',
    'LocalStorageModule'
  ])

  .constant('API_URL', 'http://www.heikkipesonen.fi/fantsutanxu/backend');
