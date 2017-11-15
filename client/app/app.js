'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import ngLoader from 'angular-loading-bar';
import ngMaterial from 'angular-material';

import {
  routeConfig,
  appRun
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import areaFactory from './services/area.factory';
import tangibleService from './services/tangible.service';
import tangiblesService from './services/tangibles.service';

import 'angular-material/angular-material.css';
import 'angular-loading-bar/build/loading-bar.css';
import './app.scss';

angular.module('edfApp', [
	ngAnimate,
	ngCookies, 
	ngResource, 
	ngSanitize, 
	ngLoader,
	ngMaterial,
	uiRouter, 
	navbar, 
	footer, 
	main,
	areaFactory,
	tangibleService,
	tangiblesService,
  constants, 
  util
])
.run(appRun)
.config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['edfApp'], {
      strictDi: true
    });
  });
