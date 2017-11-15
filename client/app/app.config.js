'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, $mdThemingProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  var customPrimary = {
      '50': '#71deff',
      '100': '#58d8ff',
      '200': '#3ed2ff',
      '300': '#25ccff',
      '400': '#0bc6ff',
      '500': '#00b9f1',
      '600': '#00a5d7',
      '700': '#0092be',
      '800': '#007ea4',
      '900': '#006b8b',
      'A100': '#8be4ff',
      'A200': '#a4eaff',
      'A400': '#bef0ff',
      'A700': '#005771'
  };
  $mdThemingProvider
      .definePalette('customPrimary', 
                      customPrimary);

  var customAccent = {
      '50': '#1e2708',
      '100': '#2e3b0d',
      '200': '#3f5012',
      '300': '#4f6516',
      '400': '#5f7a1b',
      '500': '#708f1f',
      '600': '#90b929',
      '700': '#a1ce2d',
      '800': '#abd540',
      '900': '#b4da54',
      'A100': '#90b929',
      'A200': '#80a424',
      'A400': '#708f1f',
      'A700': '#bdde69'
  };
  $mdThemingProvider
      .definePalette('customAccent', 
                      customAccent);

  var customWarn = {
      '50': '#ffb280',
      '100': '#ffa266',
      '200': '#ff934d',
      '300': '#ff8333',
      '400': '#ff741a',
      '500': '#ff6400',
      '600': '#e65a00',
      '700': '#cc5000',
      '800': '#b34600',
      '900': '#993c00',
      'A100': '#ffc199',
      'A200': '#ffd1b3',
      'A400': '#ffe0cc',
      'A700': '#803200'
  };
  $mdThemingProvider
      .definePalette('customWarn', 
                      customWarn);

  var customBackground = {
      '50': '#626567',
      '100': '#56585a',
      '200': '#494b4d',
      '300': '#3d3e40',
      '400': '#303233',
      '500': '#242526',
      '600': '#181819',
      '700': '#0b0b0c',
      '800': '#000000',
      '900': '#000000',
      'A100': '#6e7175',
      'A200': '#7b7e82',
      'A400': '#888b8e',
      'A700': '#000000'
  };
  $mdThemingProvider
      .definePalette('customBackground', 
                      customBackground);

 $mdThemingProvider.theme('default')
     .primaryPalette('customPrimary')
     .accentPalette('customAccent')
     .warnPalette('customWarn')
     //.backgroundPalette('customBackground')
}

export function appRun($rootScope) {
  'ngInject';
  $rootScope.repository = 'local';
}
