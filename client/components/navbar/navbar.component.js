'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';
import QueryFilter from './filter';

export class NavbarComponent {
  /*@ngInject*/
  constructor($rootScope, $http, $q, Tangibles){
    this.$rootScope = $rootScope;
    this.$http = $http;

    this.filter = new QueryFilter($http, $q, Tangibles);
  }

  querySearch(text){
    
    return this.filter.queryFilter(text);
  }

  selectedItemChange(item){
    this.$rootScope.__filter = item;
    //this.$rootScope.$apply();
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
