import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import _ from 'lodash';

export class MainController {

  awesomeThings = [];

  /*@ngInject*/
  constructor($scope, $http, $rootScope, $mdToast, $mdMedia, $mdDialog, $stateParams, $state, Tangibles) {
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.working = true;
    this.$mdToast = $mdToast;
    this.$mdMedia = $mdMedia;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
    this.Tangibles = Tangibles;

    this.$stateParams = $stateParams;
    this.searchText = $stateParams.buscar;
    $rootScope._searchText = $stateParams.buscar;
    this.$state = $state;

    this.query = {};

    this.medias = [
      // '(max-width: 599px)'
      { media: 'xs', columns: 1},
      //{ media: 'gt-xs', caption: '(min-width: 600px)' },
      // '(min-width: 600px) and (max-width: 959px)'
      { media: 'sm', columns: 2},
      //{ media: 'gt-sm', caption: '(min-width: 960px)' },
      // '(min-width: 960px) and (max-width: 1279px)'
      { media: 'md', columns: 3},
      //{ media: 'gt-md', caption: '(min-width: 1280px)' },
      // '(min-width: 1280px) and (max-width: 1919px)'
      { media: 'lg', columns: 4},
      //{ media: 'gt-lg', caption: '(min-width: 1920px)' },
      // '(min-width: 1920px)
      { media: 'xl', columns: 5},
    ];

    $rootScope.$watch(() => { return $rootScope.__filter; }, (value) => {
      if (value === undefined){
        this.query = {};
        return this.reload();
      }

      this.query = value.query;
      this.reload();
    });
  }

  mapItem(item){
    var ct = item.content;
    var tags = _.map(ct.tags, _.trim);

    var icons = {
      'Técnica': 'fa-cog',
      'Administrativa': 'fa-archive',
      'Pedagógica': 'fa-book',
      'DTE': 'fa-rocket',
    }

    return {
      uid: item.uid,
      area: item.content.area,//item.category[0],
      axis: item.content.axis,//item.category[1],
      block: item.content.block,//item.category[2],

      deburr_area: _.deburr(item.content.area),
      deburr_axis: _.deburr(item.content.axis),
      deburr_block: _.deburr(item.content.block),

      front: `/epm/asset/local/${item.uid}/cover/front`,
      cover: `/epm/asset/local/${item.uid}/cover/content`,
      tags: tags,
      content: ct.content,
      title: ct.title,
      autor: ct.autor,
      icon: icons[ct.area]
    };
  }

  refresh(media){
    //console.log(media);
    this.columns = [];
    // create columns
    for (var c=0; c < media.columns; c++){
      this.columns.push([]);
    }

    var chunked = _.chunk(this.packages, media.columns);

    _.each(chunked, items => {
      for (var c=0; c < media.columns; c++){
        if (items[c] !== undefined){
          this.columns[c].push(items[c]);  
        }
      }
    });

    //console.log(this.columns);
  }

  reload(){
    this.Tangibles
      // query, take, skip
      .query(this.query)
      .then((data) => {

        try {
          this.packages = _.map(data, d => {
            return this.mapItem(d);
          });
        } catch(err){
          console.log(err);
        }

        //console.log(this.packages);       

        this.working = false;
        this.grouped = _.chunk(this.packages, 2);

        _.each(this.medias, m => {

          this.$scope.$watch(() => { return this.$mdMedia(m.media); }, (value) => {
            if (value){
              this.refresh(m);  
            }
          });

        });
      })
      .catch( err => {
        this.working = false;
      });
  }

  $onInit() {
    //this.reload();
  }

  show(ev, item) {
      this.$mdDialog.show({
        controller: DialogController,
        template: require('./package.tmpl.html'),
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {item, repo: this.$rootScope.repository}
        //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        //$scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        //$scope.status = 'You cancelled the dialog.';
      });
    }
}

/*@ngInject*/
function DialogController($scope, $mdDialog, item, repo) {
  
  $scope.item = item;
  $scope.repo = repo;

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  $scope.$onInit = function(){
    
  }
}

export default angular.module('edfApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'vm'
  })
  .name;
