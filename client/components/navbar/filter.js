'use strict';

import * as _ from "lodash";
import async from 'async';

export default class QueryFilter {

  constructor($http, $q, Tangibles){
    this.$q = $q; 
    this.$http = $http;
    this.Tangibles = Tangibles;
  }

  filterByAll(search, originalText, cb){
    var q = {};

    q = { 
      $or: [
        { 'content.tags': { $regex: search } },
        { 'content.area': { $regex: search } },
        { 'content.axis': { $regex: search } },
        { 'content.block': { $regex: search } },
        { 'content.content': { $regex: search } },
        { 'content.title': { $regex: search } },
        { 'uid': { $regex: search } }
      ]
    };

    let res = {
      type: 'all',
      caption: `Todos los resultados para <strong class="searched">${originalText}</strong>`,
      value: originalText,
      icon: 'fa-filter',
      query: q
    };

    cb(null, res);
  }

  filterByArea(search, originalText, cb){
    var q = { 
      $or: [
        { 'content.area': { $regex: search } }
      ]
    };

    this.Tangibles
        .query(q)
        .then((data) => {

          let grouped = _.groupBy(data, d => { return d.content.area; });

          let res = _.map(_.keys(grouped), (key) => {
            let value = grouped[key];

            var qq = { 
              $or: [
                { 'content.area': key }
              ]
            };

            let resultados = `${value.length} resultado`;

            if (value.length > 1) {
              resultados = `${value.length} resultados`;              
            }

            return {
              type: 'area',
              caption: `Filtrar por Eje <strong class="searched">${key}</strong> <small>${resultados}</small>`,
              icon: 'fa-filter',
              value: `${key}`,
              query: qq,
              count: value.length
            };
          }); 
          cb(null, res);
        })
        .catch(cb)
  }

  filterByNivel(search, originalText, cb){
    var q = { 
      $or: [
        { 'content.axis': { $regex: search } }
      ]
    };

    this.Tangibles
        .query(q)
        .then((data) => {

          let grouped = _.groupBy(data, d => { return d.content.axis; });

          let res = _.map(_.keys(grouped), (key) => {
            let value = grouped[key];

            var qq = { 
              $or: [
                { 'content.axis': key }
              ]
            };

            let resultados = `${value.length} resultado`;

            if (value.length > 1) {
              resultados = `${value.length} resultados`;              
            }

            return {
              type: 'nivel',
              caption: `Filtrar por Nivel <strong class="searched">${key}</strong> <small>${resultados}</small>`,
              icon: 'fa-filter',
              value: `${key}`,
              query: qq,
              count: value.length
            };
          }); 
          cb(null, res);
        })
        .catch(cb)
  }

  filterBySolucion(search, originalText, cb){
    var q = { 
      $or: [
        { 'content.block': { $regex: search } }
      ]
    };

    this.Tangibles
        .query(q)
        .then((data) => {

          let grouped = _.groupBy(data, d => { return d.content.block; });

          let res = _.map(_.keys(grouped), (key) => {
            let value = grouped[key];

            var qq = { 
              $or: [
                { 'content.block': key }
              ]
            };

            let resultados = `${value.length} resultado`;

            if (value.length > 1) {
              resultados = `${value.length} resultados`;              
            }

            return {
              type: 'solucion',
              caption: `Filtrar por Solución <strong class="searched">${key}</strong> <small>${resultados}</small>`,
              icon: 'fa-filter',
              value: `${key}`,
              query: qq,
              count: value.length
            };
          }); 
          cb(null, res);
        })
        .catch(cb)
  }

  queryFilter(text, items){
  	var scaped = _.deburr(_.trim(text));

    var def = this.$q.defer();

    async.map([
      this.filterByArea,
      this.filterByNivel,
      this.filterBySolucion,
      this.filterByAll      
    ], (func, cb) => {
      func.apply(this, [scaped, text, (err, result) => {
        cb(null, result);
      }]);
    }, (err, results) => {
      if (err){
        return def.reject(err);
      }
      results = _.flattenDeep(results);

      results = _.filter(results, r => {
        if (scaped === '' && r.type === 'all'){
          return false;
        }

        return true;
      });

      def.resolve(results);
    })

    return def.promise;
  }
}