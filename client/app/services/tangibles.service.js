'use strict';

import angular from 'angular';
import _ from 'lodash';

import areaFactory from './area.factory';

/*@ngInject*/
export function tangiblesService($http, $rootScope, $q, AreaFactory) {
  return {
      // query plus
      queryp: function(query, take, skip){
        var def = $q.defer();
        var url = '/epm/queryp/' + $rootScope.repository;

        $http
          .post(url, {query:query, take: take, skip: skip})
          .then(function(response){
            let data = response.data;
            data.items = _.map(data.items, function(item){
              AreaFactory.addAlias(item);
              item.content.block = AreaFactory.blockAlias(item.content.block);
              item.content.tags = item.content.tags.split(',');
              return item;
            });
            def.resolve(data);
          })
          .catch(function(e){
            def.reject(e);
          });

        return def.promise;
      },
      // regular query
      query: function(query){
        var def = $q.defer();
        var url = '/epm/query/' + $rootScope.repository;

        $http
          .post(url, query)
          .then(function(response){
            let data = response.data;
            data = _.map(data, function(item){
              AreaFactory.addAlias(item);
              item.content.block = AreaFactory.blockAlias(item.content.block);
              item.content.tags = item.content.tags.split(',');
              return item;
            });
            def.resolve(data);
          })
          .catch(function(e){
            def.reject(e);
          });

        return def.promise;
      }
    };
}

export default angular.module('pad.Tangibles', [areaFactory])
  .service('Tangibles', tangiblesService)
  .name;