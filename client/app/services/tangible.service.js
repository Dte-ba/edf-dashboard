'use strict';

import angular from 'angular';
import _ from 'lodash';

import areaFactory from './area.factory';

/*@ngInject*/
export function tangibleService($http, $rootScope, $q, AreaFactory) {
  return {
    // query plus
    findByUid: function(uid){
      var def = $q.defer();
      var url = '/epm/metadata/' + $rootScope.repository + '/' + uid;

      $http
        .get(url)
        .then(function(response){
          let data = response.data;
          if (!data){
            return def.resolve(undefined);
          }
          AreaFactory.addAlias(data);
          data.content.block = AreaFactory.blockAlias(data.content.block);
          data.content.tags = data.content.tags.split(',');
          def.resolve(data);
        })
        .catch(function(e){
          def.reject(e);
        });

      return def.promise;
    }
  };
}

export default angular.module('pad.Tangible', [areaFactory])
  .service('Tangible', tangibleService)
  .name;